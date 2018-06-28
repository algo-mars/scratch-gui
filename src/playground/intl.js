import {addLocaleData} from 'react-intl';
import defaultsDeep from 'lodash.defaultsdeep';

import localeData from 'scratch-l10n';
import blocksMessages from 'scratch-l10n/locales/blocks-msgs';
import editorMessages from 'scratch-l10n/locales/editor-msgs';
import extensionsMessages from 'scratch-l10n/locales/extensions-msgs';
import interfaceMessages from 'scratch-l10n/locales/extensions-msgs';
import paintEditorMessages from 'scratch-l10n/locales/extensions-msgs';

const combinedMessages = defaultsDeep({}, blocksMessages.messages, editorMessages.messages, extensionsMessages.messages, interfaceMessages, paintEditorMessages);

Object.keys(localeData).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    addLocaleData(localeData[locale].localeData);
});

const intlDefault = {
    defaultLocale: 'en',
    locale: 'en',
    messages: combinedMessages.en.messages
};

export {
    intlDefault as default,
    combinedMessages
};
