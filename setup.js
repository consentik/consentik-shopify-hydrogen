import fs from 'fs';
import path from 'path';

// Đường dẫn tới file root.tsx trong dự án chính
const rootFilePath = path.join(process.cwd(), 'app', 'root.tsx');

// 1. Import các module vào đầu file root.tsx
async function addImports() {
    const importStatement = `import { CstScript, Banner, loadMetaObject } from 'consentik-shopify-hydrogen';\n`;

    // Đọc nội dung file
    let content = fs.readFileSync(rootFilePath, 'utf8');

    if (!content.includes(importStatement)) {
        content = importStatement + content;
        fs.writeFileSync(rootFilePath, content, 'utf8');
        console.log('Đã thêm import vào root.tsx');
    } else {
        console.log('Import đã tồn tại');
    }
}

// 2. Thêm `const banner = await loadMetaObject(args);` vào hàm loader và `...banner,` vào `defer`
async function modifyLoaderFunction() {
    const loadMetaObjectSnippet = 'const banner = await loadMetaObject(args);';
    const deferSnippet = '...banner,';

    // Đọc nội dung file
    let content = fs.readFileSync(rootFilePath, 'utf8');

    // Thêm `loadMetaObjectSnippet` vào hàm loader
    const loaderRegex = /async function loader\(.*\).*{([\s\S]*?)return defer\({/;
    content = content.replace(loaderRegex, (match) => {
        // Kiểm tra nếu đoạn mã đã tồn tại
        if (match.includes(loadMetaObjectSnippet)) {
            return match;
        }
        return match.replace('{', `{\n  ${loadMetaObjectSnippet}`);
    });

    // Thêm `deferSnippet` vào `defer`
    const deferRegex = /return defer\(\{([\s\S]*?)\}\);/;
    content = content.replace(deferRegex, (match) => {
        // Kiểm tra nếu đoạn mã đã tồn tại
        if (match.includes(deferSnippet)) {
            return match;
        }
        return match.replace('{', `{${deferSnippet}`);
    });

    // Ghi lại nội dung đã chỉnh sửa vào file
    fs.writeFileSync(rootFilePath, content, 'utf8');
    console.log('Đã chỉnh sửa hàm loader');
}

// 3. Thêm <Banner {...data} /> trước thẻ đóng </PageLayout>
async function addBannerComponent() {
    let content = fs.readFileSync(rootFilePath, 'utf8');
    const bannerTag = `<Banner {...data} />\n`;

    // Thêm Banner trước </PageLayout>
    content = content.replace(/(<\/PageLayout>)/g, `${bannerTag}$1`);

    // Ghi lại nội dung đã chỉnh sửa vào file
    fs.writeFileSync(rootFilePath, content, 'utf8');
    console.log('Đã thêm <Banner {...data} /> vào trước </PageLayout>');
}

// 4. Thêm <CstScript {...data} nonce={nonce} /> trước thẻ đóng </head>
async function addCstScriptComponent() {
    let content = fs.readFileSync(rootFilePath, 'utf8');
    const scriptTag = `<CstScript {...data} nonce={nonce} />\n`;

    // Thêm CstScript trước </head>
    content = content.replace(/(<\/head>)/g, `${scriptTag}$1`);

    // Ghi lại nội dung đã chỉnh sửa vào file
    fs.writeFileSync(rootFilePath, content, 'utf8');
    console.log('Đã thêm <CstScript {...data} nonce={nonce} /> vào trước </head>');
}

// Chạy các hàm để thực hiện các thay đổi
(async function setup() {
    await addImports();
    await modifyLoaderFunction();
    await addBannerComponent();
    await addCstScriptComponent();
})();
