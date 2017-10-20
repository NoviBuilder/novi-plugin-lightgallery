export function getLinkType(link){
    let type;
    if (!link) return {type: "url", id: null};
    if (/[^\s]+\.(svg|jpeg|jpg|gif|png)\s*$/.test(link)) type = 'image';
    else if (/[^\s]+\.(mp4|webm|ogg)\s*$/.test(link)) type = 'video';
    else {

        let result = parseVideo(link);
        if (result.type) {
            return result;
        }
    }

    if (type === undefined) type = "url";

    return {
        type,
        id: null
    }
}

function parseVideo(url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    url.match(/(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
    let type = null, id = null;
    if (RegExp.$3.indexOf('youtu') > -1) {
        type = 'youtube';
        id = RegExp.$6;
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
        type = 'vimeo';
        if (parseInt(RegExp.$6)){
            id = RegExp.$6;
        }
    }

    return {
        type,
        id
    };
}