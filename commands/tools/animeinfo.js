const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "animeinfo",
    aliases: ["anime"],
    category: "tools",
    handler: {
        banned: true,
        cooldown: true,
        coin: [10, "text", 1]
    },
    code: async (ctx) => {
        const {
            status,
            message
        } = await handler(ctx, module.exports.handler);
        if (status) return await ctx.reply(message);

        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "evangelion"))
        );

        try {
            const apiUrl = await tools.api.createUrl("https://api.jikan.moe", "/v4/anime", {
                q: input
            });
            const {
                data
            } = await axios.get(apiUrl);
            const info = data.data[0];

            return await ctx.reply(
                `${quote(`Judul: ${info.title}`)}\n` +
                `${quote(`Judul (Inggris): ${info.title_english}`)}\n` +
                `${quote(`Judul (Jepang): ${info.title_japanese}`)}\n` +
                `${quote(`Tipe: ${info.type}`)}\n` +
                `${quote(`Episode: ${info.episodes}`)}\n` +
                `${quote(`Durasi: ${info.duration}`)}\n` +
                `${quote(`URL: ${info.url}`)}\n` +
                `${quote("─────")}\n` +
                `${await tools.general.translate(info.synopsis, "id" )}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};