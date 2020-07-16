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
                /* for (i = 0; i < trChildren.length; i++) {
                    district['district'] = trChildren[0]; */

                    /* district.push(trChildren[i].innerText); */
                    /* if (i === 0) {
                        district['district'] = trChildren[i]
                    } else if (i === 1) {

                    } else {

                    } */
                //}
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