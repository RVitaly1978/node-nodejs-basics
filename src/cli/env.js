const parseEnv = () => {
    const searchPrefix = 'RSS_';

    const formattedEnv = Object.entries(process.env)
        .filter(([key, value]) => key.startsWith(searchPrefix))
        .reduce((acc, [key, value]) => {
            acc = acc ? `${acc}; ${key}=${value}` : `${key}=${value}`;
            return acc;
        }, '');

    console.log(formattedEnv);
};

parseEnv();
