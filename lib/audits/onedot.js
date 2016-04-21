'use strict';

let lnDocsBase = 'http://rackerlabs.github.io/encore-ui';
let lnNgDocsBase = `${lnDocsBase}/ngdocs/index.html`;
let lnApiRxForm = `${lnNgDocsBase}#/api/rxForm`;
let lnMigrateRxForm = `${lnApiRxForm}#migrating-old-code`;
let lnColorPalette = `${lnDocsBase}/#/styles/color`;
let lnRxMetadata = `${lnDocsBase}/#/modules/rxMetadata`;
let lnFlexboxGrid = `${lnDocsBase}/#/layout/grid`;
let lnTypography = `${lnDocsBase}/#/styles/typography`;

let msgRenameVar = `If you have defined this variable in your application,
please rename to avoid conflicts with imported variables.`;

function className (name) {
    return `class\\s*=\\s*['"]([^'"]*\\s)?metadata(\\s[^'"]*)?['"]`;
}

function deprecatedLessColorPalette (list) {
    let output = [];

    list.forEach((item) => {
        output.push({
            pattern: `${item}[^\\w:-]`,
            messages: [
                `"${item}" is deprecated.`,
                msgRenameVar,
                `See ${lnColorPalette} for current palette.`
            ]
        });
    });

    return output;
}//deprecatedLessColorPalette

function deprecatedLessVars (list) {
    let output = [];
    list.forEach((pair) => {
        let oldName = pair[0];
        let newName = pair[1];

        output.push({
            pattern: `${oldName}[^\\w:-]`,
            messages: [
                `"${oldName}" is deprecated.`,
                (newName === undefined ? 'There is no replacement.' : `Use "${newName}" instead.`),
                msgRenameVar,
            ]
        });
    });
    return output;
}//deprecatedLessVars

function deprecatedMixins (list) {
    let output = [];

    list.forEach((pairs) => {
        let mixin = pairs[0];
        let replacement = pairs[1];

        output.push({
            pattern: `\\.${mixin}\\s*\\(`,
            messages: [
                `".${mixin}()" mixin is unnecessary`,
                `Use ${replacement} instead.`
            ]
        });
    });

    return output;
}//deprecatedMixins

module.exports = {
    instruction: 'The following features are deprecated in 1.x and will be removed in a future release.',
    signatures: {
        /* HTML or similar Markup */
        markup: [
            {
                pattern: /pure-[gu]/,
                messages: [
                    '"Pure CSS" grids have been deprecated.',
                    'Use the "Flexbox Grid" system provided by EncoreUI.',
                    `See ${lnFlexboxGrid} for more details.`
                ]
            }, {
                pattern: /<rx-form-item/,
                messages: [
                    '<rx-form-item> is deprecated.',
                    `See ${lnMigrateRxForm}`
                ]
            }, {
                pattern: /<rx-form-fieldset/,
                messages: [
                    '<rx-form-fieldset> is deprecated.',
                    `See ${lnMigrateRxForm}`
                ]
            }, {
                pattern: /<rx-form-option-table/,
                messages: [
                    '<rx-form-option-table> is deprecated.',
                    'Use <rx-option-table> instead.'
                ]
            }, {
                pattern: /<rx-active-url/,
                messages: [
                    '<rx-active-url> is slated for removal.',
                    'There is no replacement.'
                ]
            }, {
                // element has 'metadata' class
                pattern: className('metadata'),
                messages: [
                    'The "metadata" class is deprecated.',
                    'Use a custom class name or <rx-metadata> instead.',
                    `See ${lnRxMetadata}`,
                ]
            }, {
                // heading has 'title' class
                pattern: /<h[1-6]\s+.*class\s*=\s*['"]([^'"]*\s)?title(\s[^'"]*)?['"]/,
                messages: [
                    'Heading "title" classes are deprecated.',
                    `See "Markup Conversion Table" at ${lnTypography}`
                ]
            }
        ],

        /* LESS/CSS */
        styles: [
            //{
            //    pattern: /foobar/
            //    messages: [
            //    ]
            //},
        ].concat(deprecatedMixins([
            // [ <mixin>, <replacement> ]
            ['align-content', '"align-content" property'],
            ['align-items', '"align-items" property'],
            ['align-self', '"align-self" property'],
            ['background-clip', '"background-clip" property'],
            ['border-radius', '"border-radius" property'],
            ['box-shadow', '"box-shadow" property'],
            ['box-sizing', '"box-sizing" property'],
            ['flex', '"flex" property'],
            ['flexbox', '"display: flexbox;"'],
            ['flex-basis', '"flex-basis" property'],
            ['flex-direction', '"flex-direction" property'],
            ['flex-flow', '"flex-flow" property'],
            ['flex-grow', '"flex-grow" property'],
            ['flex-shrink', '"flex-shrink" property'],
            ['flex-wrap', '"flex-wrap" property'],
            ['justify-content', '"justify-content" property'],
            ['opacity', '"opacity" property'],
            ['order', '"order" property'],
        ])).concat(deprecatedLessColorPalette([
            '@actionGreenHover',
            '@blue',
            '@cancel-gray',
            '@disabled-gray',
            '@green',
            '@infoBlueHover',
            '@infoOrangeHover',
            '@light-blue',
            '@light-green',
            '@menuLinkLightBlue',
            '@menuLinkOrange',
            '@menuRed',
            '@orange',
            '@red',
            '@warnRedHover',
        ])).concat(deprecatedLessVars([
            // [<oldName>, <newName>]
            ['@actionGreen', '@green-700'], // as found with common.less .msg-action
            ['@appBg', '@gray-50'],
            ['@appFont', '@app-font'],
            ['@appFontSize', '@app-font-size'],
            ['@appHelpBg', '@gray-950'],
            ['@appHelpBorder', '@gray-900'],
            ['@appLineHeight', '@app-line-height'],
            ['@appMenuBg', '@gray-975'],
            ['@appTextColor', '@gray-900'], // as found in common.less
            ['@buttonCancelBg', '@rxButton-cancel-background-color'],
            ['@buttonCancelBgHover', '@rxButton-cancel-hover-background-color'],
            ['@buttonColor', '@rxButton-default-text-color'],
            ['@buttonColorDisabled', '@rxButton-disabled-text-color'],
            ['@buttonDefaultBg', '@rxButton-default-background-color'],
            ['@buttonDefaultBgHover', '@rxButton-default-hover-background-color'],
            ['@buttonDisabledBg', '@rxButton-disabled-background-color'],
            ['@buttonGroupBorder', '@rxButton-button-group-border'],
            ['@buttonGroupBorderRadius', '@rxButton-button-group-border-radius'],
            ['@buttonNegativeBg', '@rxButton-negative-background-color'],
            ['@buttonNegativeBgHover', '@rxButton-negative-hover-background-color'],
            ['@buttonPositiveBg', '@rxButton-positive-background-color'],
            ['@buttonPositiveBgHover', '@rxButton-positive-hover-background-color'],
            ['@buttonSpinnerBg', '@rxButton-spinner-background-color'],
            ['@closeText', '@gray-600'], // as found in rxModalAction.less
            ['@closeTextHover', '@gray-800'], // as found in rxModalAction.less
            ['@disabled-background-color', '@app-disabled-background-color'],
            ['@disabled-text-color', '@app-disabled-text-color'],
            ['@font-size-base', '@app-font-size'],
            ['@font-size-large', 'ceil((@app-font-size * 1.25))'],
            ['@font-size-small', 'ceil((@app-font-size * 0.85))'],
            ['@infoBlue', '@blue-700'], // as found in common.less .msg-info-blue
            ['@infoOrange', '@orange-700'], // as found in common.less .msg-info
            ['@inputBackground', '@app-input-background-color'],
            ['@inputBackgroundDisabled', '@app-disabled-background-color'],
            ['@inputBackgroundError', '@app-default-error-accent-color'],
            ['@inputBorderColor', '@app-input-border-color'],
            ['@inputBorderColorInvalid', '@app-invalid-input-border-color'],
            ['@inputBorderRadius', '@app-input-border-radius'],
            ['@inputColor', '@app-input-text-color'],
            ['@inputColorDisabled', '@app-disabled-text-color'],
            ['@inputColorError', '@app-error-text-color'],
            ['@inputLabelColor', '@app-label-text-color'],
            ['@inputLabelWidth', '110px'],
            ['@inputNumberWidth', '150px'],
            ['@inputPlaceholderColor', '@app-input-placeholder-text-color'],
            ['@inputSelectWidth', '@app-input-width'],
            ['@inputWidth', '@app-input-width'],
            ['@line-height-base', '@progressbar-line-height-base'],
            ['@line-height-computed', 'floor((@app-font-size * @progressbar-line-height-base))'],
            ['@link-color', '@app-link-text-color'],
            ['@link-hover-color', '@app-link-hover-text-color'],
            ['@linkColor', '@app-link-text-color'],
            ['@linkColorHover', '@app-link-hover-text-color'],
            ['@modalBodyPadding', '@rxModalAction-body-padding'],
            ['@modalPadding', '@rxModalAction-padding'],
            ['@optionHighlightBg', '@blue-500'],
            ['@pageDivider', '#e6e6e6'],
            ['@paginationColor', '@rxPaginate-pagination-text-color'],
            ['@preprodActiveBackground', '@preprod-active-menu-background-color'],
            ['@preprodBackground', '@preprod-background-color'],
            ['@preprodBackgroundFocus', '@preprod-focus-background-color'],
            ['@preprodBorderBottom', '@preprod-border-bottom-color'],
            ['@preprodBorderTop', '@preprod-border-top-color'],
            ['@progress-bar-bg', '@progressbar-default-background-color'],
            ['@progress-bar-secondary-bg', '@progressbar-secondary-background-color'],
            ['@progress-bar-tertiary-bg', '@progressbar-tertiary-background-color'],
            ['@progress-bg', '@progressbar-background-color'],
            ['@progressbar-font-size-base', '@app-font-size'],
            ['@rxCheckbox-background-color-selected', '@rxCheckbox-selected-background-color'],
            ['@rxCheckbox-border-color-selected', '@rxCheckbox-selected-background-color'],
            ['@rxCheckbox-color', '@rxCheckbox-text-color'],
            ['@rxCheckbox-color-selected', '@app-input-background-color" or "@white'],
            ['@rxFieldName-color', '@app-label-text-color'],
            ['@rxFieldName-font-size', '@app-label-font-size'],
            ['@rxFieldName-symbol-color', '@app-required-symbol-color'],
            ['@rxForm-error-accent-color', '@app-default-error-accent-color'],
            ['@rxForm-input-border-color-invalid', '@app-invalid-input-border-color'],
            ['@rxForm-input-number-width', '150px'],
            ['@rxForm-section-min-width', '400px'],
            ['@rxForm-selected-accent-color', '@app-default-selected-accent-color'],
            ['@rxRadio-border-width-invalid', '@rxRadio-invalid-border-width'],
            ['@rxRadio-color-disabled', '@app-disabled-background-color'],
            ['@rxRadio-color-error', '@app-default-error-accent-color'],
            ['@rxRadio-color-selected', '@app-default-selected-accent-color'],
            ['@rxRadio-selected-color', '@app-default-selected-accent-color'],
            ['@rxRadio-tick-border-radius-invalid', '@rxRadio-invalid-tick-border-radius'],
            ['@rxRadio-tick-margin-invalid', '@rxRadio-invalid-tick-margin'],
            ['@rxRadio-tick-size-invalid', '@rxRadio-invalid-tick-size'],
            ['@rxSearchBox-background', '@rxSearchBox-background-color'],
            ['@rxSearchBox-background-disabled', '@rxSearchBox-disabled-background-color'],
            ['@rxSearchBox-border-radius', '@app-input-border-radius'],
            ['@rxSearchBox-color', '@rxSearchBox-text-color'],
            ['@rxSearchBox-color-disabled', '@rxSearchBox-disabled-text-color'],
            ['@rxSearchBox-color-icon', '@rxSearchBox-icon-color'],
            ['@rxSelect-background', '@rxSelect-background-color'],
            ['@rxSelect-background-disabled', '@rxSelect-disabled-background-color'],
            ['@rxSelect-border-color-disabled', '@rxSelect-disabled-border-color'],
            ['@rxSelect-border-color-invalid', '@rxSelect-invalid-border-color'],
            ['@rxSelect-color', '@rxSelect-text-color'],
            ['@rxSelect-color-disabled', '@rxSelect-disabled-text-color'],
            ['@rxSelect-trigger-background', '@rxSelect-background-color'],
            ['@rxSelect-trigger-background-color', '@rxSelect-background-color'],
            ['@rxSelect-trigger-color-disabled', '@rxSelect-disabled-trigger-color'],
            ['@rxSelect-trigger-color-invalid', '@rxSelect-invalid-trigger-color'],
            ['@rxTag-border-color', '@rxTags-border-color'],
            ['@rxTag-height', '@rxTags-height'],
            ['@siteBrandingBg', '@blue-900'], // as found in rxApp.less
            ['@subduedText', '@gray-700'], // as found in common.less .subdued
            ['@subduedTextHover', 'darken(@gray-700, 15%)'],
            ['@subduedTitle', '@gray-700'], // as found in common.less h[1-6].subdued
            ['@subtableBorder', '@gray-500'],
            ['@tabBorder', '@blue-700'], // as found in tabs.less
            ['@tableBg', '@app-default-row-background-color'],
            ['@tableBgAlt', '@app-striped-row-background-color'],
            ['@tableBorder', '@app-table-border-color'],
            ['@tableCellPadding', '@app-table-cell-padding'],
            ['@tableCellText', '@app-table-cell-text-color'],
            ['@tableHeaderBg', '@app-table-header-background-color'],
            ['@tableHeaderBorder', '@app-table-header-border-color'],
            ['@tableHeaderText', '@app-table-header-text-color'],
            ['@tableRowSelected', '@app-selected-row-background-color'],
            ['@tooltipArrowColor', '@tooltip-arrow-fill-color'],
            ['@tooltipArrowWidth', '@tooltip-arrow-width'],
            ['@tooltipBg', '@tooltip-background-color'],
            ['@tooltipColor', '@tooltip-text-color'],
            ['@tooltipHeaderColor', '@tooltip-text-color'],
            ['@tooltipMaxWidth', '@tooltip-max-width'],
            ['@tooltipOpacity', '@tooltip-opacity'],
            ['@warnRed', '@red-700'], // as found in common.less .msg-warn
            ['@wellText', '@gray-700'], // as found in common.less .well
            ['@zindexTooltip', '@tooltip-z-index'],
        ])),

        /* Javascript (excluding tests) */
        scripts: [
            {
                pattern: /[^\w-]LocalStorage/, // MUST BE CASE-SENSITIVE
                messages: [
                    '"LocalStorage" has been renamed.',
                    'Use "rxLocalStorage" instead.'
                ]
            }
        ],

        /* Javascript Tests (e2e, unit tests, etc) */
        tests: [
            {
                pattern: /cssSelector\s*:/,
                messages: [
                    'The exercise "cssSelector" option has been deprecated.',
                    'Set the "instance" option with an ElementFinder value instead.'
                ]
            }, {
                pattern: /encore\.[^\.]+\.main/,
                messages: [
                    '"main" properties of page objects are deprecated.',
                    'Use "initialize()" instead.'
                ]
            }, {
                // TODO: check regex
                pattern: /encore\.rxOptionFormTable/,
                messages: [
                    'The encore.rxOptionFormTable page object is deprecated.',
                    'Use encore.rxOptionTable instead.'
                ]
            }, {
                // TODO: check regex
                pattern: /encore\.rxToggleSwitch/,
                level: 'info',
                messages: [
                    'The rxToggleSwitch page object API has changed.',
                    '"initialize()" now requires a selector as an argument.',
                    '"isDisabled()" removed. Check that "isEnabled()" is false instead.',
                    '"isEnabled()" now represents interactability of toggle switch. Use "isToggled()" to check state.'
                ]
            }, {
                // TODO: check regex
                pattern: /encore\.rxMultiSelect/,
                level: 'info',
                messages: [
                    'The rxMultiSelect page object API has changed.',
                    '"initialize()" now requires a selector as an argument.'
                ]
            }
        ],
    }
}