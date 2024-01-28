const parseEnv = () => {
    const searchPrefix = 'RSS_';

    const formattedEnv = Object.entries(process.env)
        .filter(([key, value]) => key.startsWith(searchPrefix))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(formattedEnv);
};

parseEnv();
