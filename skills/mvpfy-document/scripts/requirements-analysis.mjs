#!/usr/bin/env node

/** Monta a análise de requisitos a partir de todo o material persistido pelo MVPFy. */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const GENERATED_MARKER = "<!-- mvpfy:generated:requirements-analysis -->";
const MAX_LIST_ITEMS = 80;

/**
 * Lê o estado do consumidor e monta a seção rastreável do documento final.
 * A resposta original é mantida junto da interpretação para não reduzir
 * descrições longas aos campos extraídos pela entrevista.
 */
export async function gerarAnaliseRequisitos(projeto) {
  const fontes = await carregarFontes(path.resolve(projeto));
  const itens = coletarItens(fontes);
  const requisitos = coletarRequisitos(fontes);
  const contexto = criarContexto(fontes);
  const status = fontes.eventos.length || fontes.report?.status === "found" ? "Parcialmente levantado" : "Pendente";

  return [
    "<!-- mvpfy:section:requirements-analysis -->",
    GENERATED_MARKER,
    "## 36. Analise de Requisitos",
    "",
    `**Status do levantamento:** ${status}`,
    "",
    "Esta seção reúne o material recebido durante a entrada e a entrevista do MVPFy. O texto original permanece na rastreabilidade; as listas abaixo organizam os elementos citados e as relações que podem orientar produto, design, desenvolvimento, operação e validação. Um item classificado como candidato ainda precisa de confirmação para entrar na versão 1.0.",
    "",
    "### Escopo compreendido a partir das entradas",
    "",
    fontes.initialIdea ? quoteBlock(fontes.initialIdea) : "Nenhuma descrição inicial foi registrada.",
    "",
    "### Requisitos funcionais rastreados",
    "",
    tabelaRequisitos(requisitos),
    "",
    "### Módulos e áreas do sistema",
    "",
    tabelaItens(itens.modules, "Módulo"),
    "",
    "### Recursos e funcionalidades citados",
    "",
    tabelaItens(itens.features, "Recurso"),
    "",
    "### Telas, páginas e interfaces citadas",
    "",
    tabelaItens(itens.screens, "Tela"),
    "",
    "### Ferramentas, integrações e serviços",
    "",
    tabelaItens(itens.tools, "Ferramenta"),
    "",
    "### Pessoas, perfis e papéis",
    "",
    tabelaItens(itens.people, "Pessoa ou papel"),
    "",
    "### Dados, regras e fluxos identificados",
    "",
    tabelaItens(itens.data, "Dado, regra ou fluxo"),
    "",
    "### Requisitos não funcionais e operação",
    "",
    tabelaItens(itens.nonFunctional, "Requisito operacional"),
    "",
    "### Itens citados sem classificação suficiente",
    "",
    tabelaItens(itens.unclassified, "Item citado"),
    "",
    "### Contexto do projeto existente utilizado no levantamento",
    "",
    contexto,
    "",
    "### Rastreabilidade integral das entradas",
    "",
    tabelaEntradas(fontes.eventos),
    "",
    "### Texto integral de cada entrada",
    "",
    blocosEntradasIntegrais(fontes.eventos),
    "",
    "### Pendências para confirmação",
    "",
    criarPendencias(fontes, itens),
  ].join("\n").trimEnd() + "\n";
}

/** Insere a análise gerada no bloco correspondente do template versionado. */
export async function prepararTemplateComAnalise(template, projeto) {
  const comAnalise = substituirBloco(template, "requirements-analysis", await gerarAnaliseRequisitos(projeto));
  return substituirBloco(comAnalise, "requirements-specification", gerarEstruturaEspecificacao());
}

/**
 * Fornece um roteiro neutro para detalhar qualquer produto de software.
 * Os títulos orientam a consolidação, mas não pressupõem um domínio, stack,
 * módulo ou tipo de organização específico.
 */
function gerarEstruturaEspecificacao() {
  const topicos = [
    ["1. Visão geral", "Objetivo, problema, público, resultado esperado e limites do produto: Pendente."],
    ["2. Princípios do sistema", "Princípios de produto, arquitetura, dados e experiência: Pendente."],
    ["3. Pessoas, organizações e papéis", "Pessoas usuárias, clientes, beneficiários, administradores e responsabilidades: Pendente."],
    ["4. Contas, espaços e isolamento", "Unidades de trabalho, pertencimento, compartilhamento e separação de dados: Pendente."],
    ["5. Configurações globais", "Preferências, identidade, idioma, timezone, dados institucionais e parâmetros reutilizados: Pendente."],
    ["6. Módulos e entidades do domínio", "Módulos, entidades, objetivos, relações e ciclos de vida: Pendente."],
    ["7. Dados e modelo de informação", "Campos, identificadores, estados, origem, retenção e qualidade dos dados: Pendente."],
    ["8. Requisitos funcionais", "Ações que cada papel precisa executar e resultados esperados: Pendente."],
    ["9. Regras de negócio", "Condições, cálculos, validações, exceções, limites e efeitos: Pendente."],
    ["10. Jornadas principais", "Entrada, passos, resultados, falhas tratadas e primeiro valor: Pendente."],
    ["11. Jornadas secundárias", "Fluxos administrativos, recorrentes, alternativos e de recuperação: Pendente."],
    ["12. Telas e interfaces", "Telas, páginas, componentes, estados e informação apresentada em cada interface: Pendente."],
    ["13. Formulários e captura de dados", "Campos, ajuda, validação, envio, erro, confirmação e reutilização: Pendente."],
    ["14. Navegação e rotas", "Menu, hierarquia, abas, rotas, busca e acesso contextual: Pendente."],
    ["15. Páginas públicas e conversão", "Páginas abertas, formulários, CTAs, disponibilidade e comportamento pós-conversão: Pendente."],
    ["16. Conteúdo, documentos e mídia", "Criação, edição, publicação, formatos, arquivos, imagens e ciclo de vida: Pendente."],
    ["17. Busca, conhecimento e recuperação", "Fontes, indexação, filtros, consulta, resultados e atualização: Pendente."],
    ["18. Automação e IA", "Entradas, instruções, processamento, aprovação humana, saídas, custo e fallback: Pendente."],
    ["19. Integrações externas", "Serviços, credenciais, dados trocados, eventos, falhas e sincronização: Pendente."],
    ["20. API", "Recursos expostos, operações, autenticação, filtros, paginação, erros e limites: Pendente."],
    ["21. MCP e interfaces para agentes", "Ferramentas, recursos, permissões, autenticação e escopo para agentes: Pendente."],
    ["22. Autenticação e autorização", "Entrada, sessões, papéis, permissões, convites, recuperação e revogação: Pendente."],
    ["23. Comunicação e notificações", "Canais, preferências, conteúdo, entrega, rastreamento e cancelamento: Pendente."],
    ["24. Eventos, histórico e auditoria", "Eventos de domínio, timeline, logs administrativos, origem e consulta: Pendente."],
    ["25. Processamento assíncrono", "Jobs, filas, prioridade, retentativas, falhas e monitoramento: Pendente."],
    ["26. Atualizações em tempo real", "Eventos, canais, interfaces afetadas, consistência e fallback: Pendente."],
    ["27. Métricas e analytics", "Métricas, eventos coletados, fontes, relatórios e periodicidade: Pendente."],
    ["28. Preço, créditos e cobrança", "Unidade de cobrança, planos, consumo, limites, pagamento e histórico: Pendente."],
    ["29. Administração global", "Recursos internos, suporte, governança, acesso e separação da área do cliente: Pendente."],
    ["30. Experiência, responsividade e acessibilidade", "Viewport, dispositivos, acessibilidade, feedback, vazios e erros: Pendente."],
    ["31. Internacionalização e localização", "Idiomas, formatos, moeda, datas, números e timezone: Pendente."],
    ["32. SEO e descoberta", "Metadados, URLs, indexação, compartilhamento e dados estruturados quando aplicável: Pendente."],
    ["33. Arquivos e armazenamento", "Uploads, tipos, tamanho, acesso, processamento, expiração e limpeza: Pendente."],
    ["34. Infraestrutura e ambientes", "Ambientes, serviços, deploy, configuração, backup e recuperação: Pendente."],
    ["35. Desempenho e capacidade", "Volume esperado, latência, concorrência, cache e limites operacionais: Pendente."],
    ["36. Segurança e privacidade", "Dados sensíveis, acesso, segredos, consentimento, retenção e conformidade: Pendente."],
    ["37. Confiabilidade e observabilidade", "Logs, alertas, monitoramento, diagnóstico e continuidade: Pendente."],
    ["38. Design system e identidade", "Tokens, componentes, variações visuais e regras de aplicação: Pendente."],
    ["39. Testes e aceite", "Cenários, entradas, resultado esperado, exceções e aceite por requisito: Pendente."],
    ["40. Migração e dados existentes", "Importação, transformação, validação, reconciliação e reversão: Pendente."],
    ["41. Restrições e itens fora do MVP", "Limites assumidos, exclusões e sinais para retomar cada item: Pendente."],
    ["42. Dependências e pendências", "Dependências técnicas, comerciais, legais e perguntas que ainda precisam de resposta: Pendente."],
    ["43. Ordem de implementação", "Domínios, entregas, dependências, marcos e sequência recomendada: Pendente."],
    ["44. Próxima etapa", "Próxima especificação, validação ou entrega necessária para avançar: Pendente."],
  ];
  return [
    "<!-- mvpfy:section:requirements-specification -->",
    "## 37. Especificação funcional detalhada",
    "",
    "**Status:** Pendente",
    "",
    "Esta estrutura organiza uma descrição completa de software sem pressupor domínio, tecnologia ou tipo de negócio. Preencha cada tópico somente com informações recebidas, recomendações identificadas como tal ou pendências específicas.",
    "",
    ...topicos.flatMap(([titulo, descricao]) => [`### ${titulo}`, "", descricao, ""]),
  ].join("\n").trimEnd() + "\n";
}

function substituirBloco(template, id, conteudo) {
  const blocos = extrairBlocos(template);
  const alvo = blocos.find((bloco) => bloco.id === id);
  if (!alvo) return template;
  return `${template.slice(0, alvo.inicio)}${conteudo}\n\n${template.slice(alvo.fim)}`;
}

async function carregarFontes(projeto) {
  const estado = await lerJson(path.join(projeto, ".mvpfy", "state.json"), {});
  const report = await lerJson(path.join(projeto, ".mvpfy", "existing-project.json"), null);
  const eventos = await lerEventos(path.join(projeto, ".mvpfy", "answers.jsonl"));
  const initialEvents = eventos.filter((evento) => evento.event_type === "initial_idea");
  return {
    estado,
    report,
    eventos,
    initialIdea: initialEvents.map((evento) => evento.raw_answer).filter(Boolean).join("\n\n") || estado.initial_idea || "",
  };
}

async function lerJson(arquivo, padrao) {
  if (!existsSync(arquivo)) return padrao;
  try {
    return JSON.parse(await readFile(arquivo, "utf8"));
  } catch {
    return padrao;
  }
}

async function lerEventos(arquivo) {
  if (!existsSync(arquivo)) return [];
  const linhas = (await readFile(arquivo, "utf8")).split(/\r?\n/).filter(Boolean);
  return linhas.flatMap((linha) => {
    try {
      const evento = JSON.parse(linha);
      return evento && typeof evento === "object" ? [evento] : [];
    } catch {
      return [];
    }
  });
}

function coletarRequisitos(fontes) {
  return fontes.eventos.map((evento, indice) => {
    const campos = Array.isArray(evento.extracted_fields) ? evento.extracted_fields : [];
    const texto = limparTexto(evento.normalized_answer || evento.raw_answer || "");
    const tipo = evento.event_type === "initial_idea" ? "Entrada inicial" : "Resposta da entrevista";
    const estado = evento.supersedes ? "Correção registrada; leitura anterior mantida" : "Recebido";
    return {
      id: `RF-${String(indice + 1).padStart(3, "0")}`,
      tipo,
      descricao: texto || "Texto vazio não disponível",
      campos: campos.join(", ") || "Não informado",
      estado,
    };
  });
}

function coletarItens(fontes) {
  const grupos = criarGrupos();
  const candidatos = Array.isArray(fontes.estado.candidate_items) ? fontes.estado.candidate_items : [];
  const rotulados = fontes.eventos.flatMap((evento) => Object.entries(extrairItensRotulados(String(evento.raw_answer || ""))));
  const nomesRotulados = new Map(rotulados.flatMap(([grupo, valores]) => valores.map((valor) => [limparItem(valor).toLowerCase(), grupo])));
  for (const candidato of candidatos) {
    const nome = limparItem(candidato.name);
    adicionarItem(grupos, nome, "candidate_items", candidato.status || "candidate", nomesRotulados.get(nome.toLowerCase()) || null);
  }

  for (const evento of fontes.eventos) {
    const texto = String(evento.raw_answer || "");
    for (const [, valores] of Object.entries(extrairItensRotulados(texto))) {
      for (const valor of valores) adicionarItem(grupos, valor, `${evento.question_id || evento.event_type}: texto original`, "citado");
    }
    for (const pessoa of extrairPessoas(texto)) adicionarItem(grupos, pessoa, `${evento.question_id || evento.event_type}: texto original`, "citado", "people");
    classificarCampos(grupos, evento);
  }

  const report = fontes.report;
  for (const stack of report?.stack || []) adicionarItem(grupos, stack.name, stack.sources?.join(", ") || "existing-project.json", "encontrado no projeto");
  for (const manifest of report?.manifests || []) {
    for (const dependency of manifest.dependencies || []) adicionarItem(grupos, dependency, manifest.path, "declarado no manifesto");
  }

  return Object.fromEntries(Object.entries(grupos).map(([chave, valores]) => [
    chave,
    deduplicar(valores).slice(0, MAX_LIST_ITEMS),
  ]));
}

function criarGrupos() {
  return {
    modules: [],
    features: [],
    screens: [],
    tools: [],
    people: [],
    data: [],
    nonFunctional: [],
    unclassified: [],
  };
}

function extrairItensRotulados(texto) {
  const grupos = {};
  const rotulos = [
    ["modules", /(?:m[óo]dulos?|m[óo]dulo|[áa]reas?)\s*(?::|\-|\s+(?:de|do|da))\s*([^.!?\n]+)/gi],
    ["features", /(?:recursos?|funcionalidades?|fun[cç][ãa]o)\s*(?::|\-|\s+(?:de|do|da))\s*([^.!?\n]+)/gi],
    ["screens", /(?:telas?|p[áa]ginas?|interfaces?)\s*(?::|\-|\s+(?:de|do|da))\s*([^.!?\n]+)/gi],
    ["tools", /(?:ferramentas?|integra[cç][õo]es?|servi[cç]os?)\s*(?::|\-|\s+(?:com|de|do|da))\s*([^.!?\n]+)/gi],
    ["people", /(?:pessoas?|perfis?|pap[ée]is?|personas?)\s*(?::|\-|\s+(?:de|do|da))\s*([^.!?\n]+)/gi],
    ["data", /(?:dados?|regras?|fluxos?|processos?)\s*(?::|\-|\s+(?:de|do|da))\s*([^.!?\n]+)/gi],
    ["nonFunctional", /(?:requisitos? n[ãa]o funcionais?|seguran[cç]a|desempenho|backup|disponibilidade)\s*[:\-]\s*([^.!?\n]+)/gi],
  ];
  for (const [grupo, padrao] of rotulos) {
    const itens = [];
    for (const encontrado of texto.matchAll(padrao)) itens.push(...separarItens(encontrado[1]));
    if (itens.length) grupos[grupo] = itens;
  }
  return grupos;
}

function extrairPessoas(texto) {
  const encontrados = [];
  const padrao = /\b(?:a|o|as|os)?\s*(secret[áa]ria|gestor|gestora|administrador|administradora|cliente|usu[áa]rio|usu[áa]ria|equipe|atendente|vendedor|vendedora|profissional|pagador|comprador|empresa|ag[êe]ncia)\b/gi;
  for (const encontrado of texto.matchAll(padrao)) encontrados.push(encontrado[1]);
  return encontrados;
}

function classificarCampos(grupos, evento) {
  const texto = limparTexto(evento.normalized_answer || evento.raw_answer || "");
  for (const campo of evento.extracted_fields || []) {
    const nome = String(campo).toLowerCase();
    const grupo = nome.includes("screen") || nome.includes("tela") || nome.includes("page")
      ? "screens"
      : nome.includes("tool") || nome.includes("technology") || nome.includes("integration") || nome.includes("stack")
        ? "tools"
        : nome.includes("audience") || nome.includes("persona") || nome.includes("role") || nome.includes("user")
          ? "people"
          : nome.includes("data") || nome.includes("flow") || nome.includes("rule") || nome.includes("journey")
            ? "data"
            : nome.includes("module") || nome.includes("scope") || nome.includes("product")
              ? "features"
              : null;
    if (grupo && texto) adicionarItem(grupos, texto, `${evento.question_id || "resposta"}: ${campo}`, "derivado do campo informado", grupo);
  }
}

function adicionarItem(grupos, valor, fonte, status, grupoForcado = null) {
  const nome = limparItem(valor);
  if (!nome || nome.length > 180) return;
  const grupo = grupoForcado || classificarNome(nome);
  grupos[grupo].push({ nome, fonte, status });
}

function classificarNome(nome) {
  const texto = nome.toLowerCase();
  if (/\b(tela|página|pagina|dashboard|login|cadastro|painel|interface)\b/.test(texto)) return "screens";
  if (/\b(l[íi]der|admin|administrador|gestor|cliente|usu[áa]rio|equipe|atendente|vendedor|ag[êe]ncia|empresa|persona|pagador)\b/.test(texto)) return "people";
  if (/\b(api|whatsapp|stripe|openai|laravel|react|vue|next|typescript|php|python|postgres|mysql|redis|docker| ferramenta|integra[cç][ãa]o)\b/i.test(texto)) return "tools";
  if (/\b(dado|cadastro|status|regra|fluxo|processo|permiss[ãa]o|notifica[cç][ãa]o|relat[óo]rio)\b/.test(texto)) return "data";
  if (/\b(seguran[cç]a|backup|desempenho|escala|disponibilidade|auditoria|privacidade)\b/.test(texto)) return "nonFunctional";
  return "unclassified";
}

function criarContexto(fontes) {
  const report = fontes.report;
  if (!report) return "Nenhum relatório de projeto existente foi encontrado.";
  const linhas = [];
  linhas.push(`- **Estado da leitura:** ${report.status || "não informado"}.`);
  if (report.stack?.length) linhas.push(`- **Stack encontrada:** ${report.stack.map((item) => item.name).join(", ")}.`);
  if (report.sources?.specs?.length) {
    linhas.push("- **Documentos de produto lidos:**");
    for (const spec of report.sources.specs) linhas.push(`  - \`${spec.path}\` (${spec.type}): ${limparTexto(spec.title || spec.excerpt || "sem resumo")}.`);
  }
  if (report.manifests?.length) {
    linhas.push("- **Manifestos e dependências:**");
    for (const manifest of report.manifests) {
      const dependencias = manifest.dependencies?.length ? manifest.dependencies.join(", ") : "sem dependências listadas";
      linhas.push(`  - \`${manifest.path}\`: ${dependencias}.`);
    }
  }
  if (report.sources?.code?.length) linhas.push(
    `- **Arquivos de código encontrados:** ${report.sources.code.length}; os caminhos permanecem no relatório `
      + "`.mvpfy/existing-project.json`.",
  );
  if (report.gaps?.length) {
    linhas.push("- **Pontos ainda sem resposta no material lido:**");
    for (const gap of report.gaps) linhas.push(`  - ${gap.field}: ${limparTexto(gap.reason)}.`);
  }
  return linhas.join("\n");
}

function criarPendencias(fontes, itens) {
  const pendencias = [];
  if (!fontes.initialIdea) pendencias.push("A descrição inicial do produto ainda não foi registrada.");
  if (!fontes.eventos.length) pendencias.push("Nenhuma resposta foi salva na entrevista.");
  if (!itens.modules.length) pendencias.push("Nenhum módulo foi identificado; confirme a divisão funcional do sistema.");
  if (!itens.screens.length) pendencias.push("Nenhuma tela foi identificada; descreva as interfaces necessárias para a jornada principal.");
  if (!itens.people.length) pendencias.push("Nenhuma pessoa ou papel foi identificado; confirme quem usa, administra e paga.");
  if (!pendencias.length) return "O levantamento possui entradas e itens classificados. Confirme cada candidato antes de transformá-lo em escopo fechado da versão 1.0.";
  return pendencias.map((item) => `- ${item}`).join("\n");
}

function tabelaRequisitos(requisitos) {
  if (!requisitos.length) return "Nenhum requisito foi rastreado ainda.";
  return [
    "| ID | Origem | Requisito ou necessidade registrada | Campos cobertos | Estado |",
    "| --- | --- | --- | --- | --- |",
    ...requisitos.map((item) => `| ${item.id} | ${item.tipo} | ${celula(item.descricao)} | ${celula(item.campos)} | ${item.estado} |`),
  ].join("\n");
}

function tabelaItens(itens, rotulo) {
  if (!itens.length) return `Nenhum ${rotulo.toLowerCase()} foi identificado nas fontes disponíveis.`;
  return [
    `| ${rotulo} | Origem | Classificação |`,
    "| --- | --- | --- |",
    ...itens.map((item) => `| ${celula(item.nome)} | ${celula(item.fonte)} | ${celula(item.status)} |`),
  ].join("\n");
}

function tabelaEntradas(eventos) {
  if (!eventos.length) return "Nenhuma entrada foi salva em `.mvpfy/answers.jsonl`.";
  return [
    "| Data | Identificador | Pergunta ou etapa | Texto original completo | Interpretação registrada | Campos |",
    "| --- | --- | --- | --- | --- | --- |",
    ...eventos.map((evento) => `| ${celula(evento.timestamp || "não informado")} | ${celula(evento.event_id || "não informado")} | ${celula(evento.question_text || evento.question_id || evento.event_type || "não informado")} | ${celula(evento.raw_answer || "não informado")} | ${celula(evento.normalized_answer || "não informado")} | ${celula((evento.extracted_fields || []).join(", ") || "não informado")} |`),
  ].join("\n");
}

function blocosEntradasIntegrais(eventos) {
  if (!eventos.length) return "Nenhuma entrada foi salva em `.mvpfy/answers.jsonl`.";
  return eventos.map((evento, indice) => [
    `#### Entrada ${indice + 1}: ${celula(evento.question_id || evento.event_type || "não informado")}`,
    "",
    quoteBlock(evento.raw_answer || "Texto original não informado."),
  ].join("\n")).join("\n\n");
}

function quoteBlock(texto) {
  return String(texto)
    .replace(/<!--/g, "&lt;!--")
    .replace(/-->/g, "--&gt;")
    .split(/\r?\n/)
    .map((linha) => `> ${linha || " "}`)
    .join("\n");
}

function separarItens(texto) {
  return String(texto)
    .split(/[,;]|\s+e\s+/i)
    .map((item) => limparItem(item))
    .filter(Boolean)
    .slice(0, MAX_LIST_ITEMS);
}

function limparItem(valor) {
  return limparTexto(String(valor || "")
    .replace(/^[\s\-–—:]+|[\s.!?]+$/g, "")
    .replace(/^(?:m[óo]dulo|tela|p[áa]gina|interface|integra[cç][ãa]o|ferramenta)\s+(?:de|do|da|com)?\s*/i, ""));
}

function limparTexto(valor) {
  return String(valor || "")
    .replace(/<!--/g, "&lt;!--")
    .replace(/-->/g, "--&gt;")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function celula(valor) {
  return limparTexto(valor) || "não informado";
}

function deduplicar(itens) {
  const vistos = new Set();
  return itens.filter((item) => {
    const chave = item.nome.toLowerCase();
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
}

function extrairBlocos(texto) {
  const marcador = /<!-- mvpfy:section:([a-z0-9-]+) -->/g;
  const encontrados = [...texto.matchAll(marcador)];
  return encontrados.map((encontrado, indice) => ({
    id: encontrado[1],
    inicio: encontrado.index,
    fim: encontrados[indice + 1]?.index || texto.length,
  }));
}
