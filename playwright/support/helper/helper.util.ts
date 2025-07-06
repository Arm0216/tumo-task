class HelperUtil {
    static gbToRgba(rgbStr: string, alpha: number): string {
        return rgbStr.replace(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/, `rgba($1, $2, $3, ${alpha})`);
    }
}

export default HelperUtil;
