const React = novi.react.React;
import GallerySettingsEditor from "./GallerySettings/GallerySettingsEditor";
import GalleryItemSettingsEditor from "./GalleryItemSettings/GalleryItemSettingsEditor";
import GalleryAlbumSettingsEditor from "./GalleryAlbumSettings/GalleryAlbumSettingsEditor";
import Settings from "./Settings";

const Plugin = {
    name: "novi-plugin-light-gallery",
    title: "Novi Light Gallery",
    description: "Novi Light Gallery description",
    version: "1.0.0",
    defaults: {
        querySelector: '[data-lightgallery="group"],[data-lightgallery="dynamic"]',
        childQuerySelector: '[data-lightgallery="item"]'
    },
    ui: {
        editor: [GalleryAlbumSettingsEditor, GalleryItemSettingsEditor, GallerySettingsEditor],
        settings: <Settings />,
    }
};

novi.plugins.register(Plugin);