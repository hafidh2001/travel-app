export interface IMenu {
    title: string;
    title_id: string;
    href: string;
}

export interface INavigation {
    title: string;
    href?: string;
    subnav?: Array<{
        title: string;
        subsubnav: Array<{ title: string; href: string }>;
    }>;
}

export interface IBreadcrumb {
    href: string;
    value: Array<string>;
}

export interface ICompetence {
    competence_name: string;
    competences_id: number;
    created_at: string;
    date: string;
    definition: string;
    levels: string;
    prompt: string;
    user_id: number;
}

export interface IPrompt {
    prompt_content: string;
    prompt_id: number;
    prompt_type: string;
    created_at: string;
}

export interface IParticipant {
    author: string;
    email_participant: string;
    participants_id: number;
    name: string;
    position: string;
    user_id: number;
    username_participant: string;
}

export interface ISchedule {
    schedules_id: number;
    created_at: string;
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    duration: number;
    competence_name: string;
    status: string;
}
