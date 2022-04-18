import { BaseCommandInteraction, Constants } from "discord.js";
import { Event } from "../datamodel/Event";
import { Commands } from "../Commands";

export const InteractionCreateEvent: Event = {
    name: Constants.Events.INTERACTION_CREATE,
    once: false,
    execute: async(interaction: BaseCommandInteraction) => {
        if (interaction.isCommand()) {
            const command = Commands.find(c => c.name === interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                if (!(error instanceof Error)) { throw error; }
                interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        } 
    }
};