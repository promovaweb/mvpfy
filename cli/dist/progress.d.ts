/** Leitura de progresso do projeto consumidor do MVPFy. */
export interface ProgressArea {
    id: string;
    label: string;
    status: "pending" | "in_progress" | "complete";
    percent: number;
    complete: number;
    total: number;
    sections: Array<{
        id: string;
        complete: boolean;
    }>;
}
export interface ProgressSnapshot {
    project: string;
    document: boolean;
    overall: number;
    status: "pending" | "in_progress" | "complete";
    areas: ProgressArea[];
    pending_sections: string[];
    tenancy: Record<string, unknown>;
    interview: {
        status: string;
        stage: string;
        answers: number;
        last_question_id: string | null;
    };
    next_gap: {
        id: string;
        label: string;
    } | null;
}
export declare const PROGRESS_AREAS: readonly [{
    readonly id: "problem";
    readonly label: "Problema";
    readonly sections: readonly ["problem", "evidence"];
}, {
    readonly id: "audience";
    readonly label: "Público";
    readonly sections: readonly ["audience", "personas"];
}, {
    readonly id: "product";
    readonly label: "Produto";
    readonly sections: readonly ["value-and-positioning", "main-journey", "scope", "modules", "permissions"];
}, {
    readonly id: "saas";
    readonly label: "SaaS";
    readonly sections: readonly ["account-model", "onboarding", "subscription", "support-retention", "manual-processes"];
}, {
    readonly id: "market";
    readonly label: "Mercado e preço";
    readonly sections: readonly ["competition", "commercial", "economics"];
}, {
    readonly id: "technology";
    readonly label: "Tecnologia";
    readonly sections: readonly ["technology", "infrastructure", "ai"];
}, {
    readonly id: "marketing";
    readonly label: "Marketing";
    readonly sections: readonly ["website", "marketing", "sales"];
}, {
    readonly id: "validation";
    readonly label: "Validação";
    readonly sections: readonly ["metrics", "risks", "execution", "decisions", "hypotheses", "sources"];
}];
export declare function scanProgress(project?: string): Promise<ProgressSnapshot>;
export declare function formatProgress(snapshot: ProgressSnapshot): string;
export declare function tenancyLabel(tenancy: Record<string, unknown>): string;
//# sourceMappingURL=progress.d.ts.map