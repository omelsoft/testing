const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');

const compile = async(fileName, data) => {

    const filePath = path.join(process.cwd(), 'src/templates', `${fileName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

exports.folhaPonto = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        var d = {
            "mes": "julho",
            "author": "Felipe Paz"
        }

        let content = await compile('folha_ponto', d);
        console.log(content);

        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf({
            path: 'dist/pdf/teste.pdf',
            format: 'A4',
            printBackground: true
        })

        console.log('done');
        await browser.close();

    } catch (error) {
        console.log('Errors => ', error);
    }
};
