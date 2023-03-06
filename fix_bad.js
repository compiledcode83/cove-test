import React, { useEffect, useState } from 'react';

function Card({ title, text, linkTitle, href, onClick, linkClassName, target, rel }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        href={href}
        rel={rel}
        target={target}
        onClick={() => onClick(href)}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://my-json-server.typicode.com/savayer/demo/posts'
      );
      const data = await response.json();

      const newCards = data.map(item => ({
        id: item.id,
        title: item.title.en,
        linkTitle: item.link_title,
        href: item.link,
        text: item.body.en.substr(0, 50) + '...',
        className: item.id === 1 ? 'card__link--red' : '',
        target: item.id === 1 ? '_blank' : '',
      }));

      setCards(newCards);
    }

    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map(item => (
        <Card
          key={item.id}
          title={item.title}
          linkTitle={item.linkTitle}
          href={item.href}
          text={item.text}
          linkClassName={item.className}
          target={item.target}
          rel="noopener noreferrer"
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}
