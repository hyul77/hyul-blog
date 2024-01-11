import { appendFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD
 */
let text = '';

// 현재 날짜 생성
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://hyul-code.tistory.com/rss');

    // 최신 2개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 2; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href="${link}">${title}</a></br>`;
    }

    // 현재 날짜를 추가
    text += `</br>**${formattedDate} 업데이트**</br>`;

    // README.md 파일에 내용 추가
    appendFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
})();
