const parseArgs = () => {
    const argNamePrefix = '--';

    let processedArgIndex = -1;
    const args = [];
    const rawArgs = process.argv.slice(2);

    rawArgs.forEach((item, idx) => {
        if (idx === processedArgIndex) { return }

        processedArgIndex = idx;

        if (item.startsWith(argNamePrefix)) {
            let value = true
            const key = item.slice(2);
            const nextItem = rawArgs[idx + 1]
            if (nextItem && !nextItem.startsWith(argNamePrefix)) {
                value = nextItem;
                processedArgIndex = idx + 1;
            }
            args.push({ key, value })
        }
    });

    const formattedArgs = args
        .map(({ key, value }) => `${key} is ${value}`)
        .join(', ');

    console.log(formattedArgs);
};

parseArgs();
