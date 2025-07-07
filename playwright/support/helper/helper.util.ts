import path from "path";

class HelperUtil {
    static gbToRgba(rgbStr: string, alpha: number): string {
        return rgbStr.replace(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/, `rgba($1, $2, $3, ${alpha})`);
    }

    public static getStaticFilePath(filePath: string): string {
        return path.join(process.cwd(), 'playwright', 'fixtures', 'static', filePath);
    }
}

export default HelperUtil;
