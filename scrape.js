const puppeteer = require('puppeteer');

const scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://caxiascovid19.com.br/');
    //await page.goto('http://books.toscrape.com/');

    const result = await page.evaluate(() => {
        const districts = [];
        document.querySelectorAll('main#main > section#team > div.container > div.row > div.table-responsive > table.table.table-striped > tbody tr')
            .forEach((tr) => {
                const district = {};
                const trChildren = tr.children;
                district['district'] = trChildren[0].innerText;
                district['confirmed'] = trChildren[1].innerText;
                district['recovered'] = trChildren[2].innerText;
                districts.push(district);
            });
        return districts;
        /* const books = [];
        document.querySelectorAll('section > div > ol > li img')
            .forEach(book => books.push(book.getAttribute('alt')));
        return books; */
    })

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});