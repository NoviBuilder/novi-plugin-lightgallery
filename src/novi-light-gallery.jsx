const React = novi.react.React;
import * as ExcerptFunction from "./ExcerptFunction";
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
    },
    // excerpt : ExcerptFunction.validBgImage
};

novi.plugins.register(Plugin);