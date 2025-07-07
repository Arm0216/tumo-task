class FilesEndpoints {
    public static fileEndpoint(fileId: string): string {
        return `/file/${fileId}`;
    }
}

export default FilesEndpoints;
