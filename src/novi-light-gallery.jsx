const React = novi.react.React;
import GallerySettingsEditor from "./GallerySettings/GallerySettingsEditor";
import GalleryItemSettingsEditor from "./GalleryItemSettings/GalleryItemSettingsEditor";
import GalleryAlbumSettingsEditor from "./GalleryAlbumSettings/GalleryAlbumSettingsEditor";
import Settings from "./Settings";
const Language = novi.language;
const Plugin = {
    name: "novi-plugin-light-gallery",
    title: "Novi Light Gallery",
    description: "Novi Light Gallery description",
    version: "1.0.1",
    dependencies: {
        novi: "0.8.6"
    },
    defaults: {
        groupQuerySelector: '[data-lightgallery="group"]',
        albumQuerySelector: '[data-lightgallery="dynamic"]',
        childQuerySelector: '[data-lightgallery="item"]',
        querySelector: '[data-lightgallery="group"], [data-lightgallery="dynamic"], [data-lightgallery="item"]'
    },
    ui: {
        editor: [GalleryAlbumSettingsEditor, GalleryItemSettingsEditor, GallerySettingsEditor],
        settings: <Settings />,
    },
    onLanguageChange: onLanguageChange
};
function onLanguageChange(plugin){
    let messages = Language.getDataByKey("novi-plugin-light-gallery");
    plugin.ui.editor[2].title = messages.editor.group.title;
    plugin.ui.editor[2].tooltip = messages.editor.group.tooltip;
    plugin.ui.editor[2].header = <span>{messages.editor.group.header}</span>;
    plugin.ui.editor[1].title = messages.editor.item.title;
    plugin.ui.editor[1].tooltip = messages.editor.item.tooltip;
    plugin.ui.editor[1].header = <span>{messages.editor.item.header}</span>;
    plugin.ui.editor[0].title = messages.editor.album.title;
    plugin.ui.editor[0].tooltip = messages.editor.album.tooltip;
    plugin.ui.editor[0].header = <span>{messages.editor.album.header}</span>;
    return plugin;
}
novi.plugins.register(Plugin);