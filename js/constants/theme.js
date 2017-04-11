/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform, Dimensions, PixelRatio} from 'react-native';
import colors from './colors';
import px2dp from '../utils/px2dp';

export default {
    mainThemeColor: colors.gray,
    pageBackgroundColor: '#ffffff',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    segment: {
        color: '#ccc',
        width: 1/PixelRatio.get()
    },
    tabButton: {
        normalColor: '#aaa'
    },
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(50) : px2dp(60),
        paddingTop: Platform.Version >= 21 ? px2dp(20) : 0,
        //barColor: favoriteColor,
        titleColor: '#696969',
        titleSize: Platform.OS === 'android' ? px2dp(16) : px2dp(14),
        textBtnSize: Platform.OS === 'android' ? px2dp(12) : px2dp(11)
    },
    segmentColor: '#ccc',
    titleColor: colors.red,
    subTitleColor: '#aaa',
    rowItemBackgroundColor: '#f7f7f7',
    arrowColor: colors.red,
    tabIconColor: colors.red,
    thumbnailColor: '#f1f1f1',
    webViewToolbarColor: 'rgba(255,255,255,.9)'
}