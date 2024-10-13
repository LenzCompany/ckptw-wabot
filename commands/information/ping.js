module.exports = {
    name: "ping",
    category: "information",
    handler: {
        banned: true,
        cooldown: true
    },
    code: async (ctx) => {
        await global.handler(ctx, module.exports.handler).then(({
            status,
            message
        }) => {
            if (status) return ctx.reply(message);
        });

        return ctx.reply("Pong!");
    }
};