class ProjectsEndpoint {
    public static get sortEndpoint(): string {
        return `/projects/sort`;
    }

    public static projectResultEndpoint(id: string): string {
        return `/projects/result/${id}`;
    }

    public static unpublishedProjectsEndpoint(id: string): string {
        return `/projects/${id}/unpublished`;
    }

    public static publishProjectEndpoint(id: string): string {
        return `/projects/${id}/published`;
    }
}

export default ProjectsEndpoint;
