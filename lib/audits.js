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
    return `class\\s*=\\s*['"]([^'"]*\\s)?${name}(\\s[^'"]*)?['"]`;
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


/*
 * TYPE:
 * > 'error' - no longer available. fix now
 * > 'warning' - deprecated. will be removed later
 * > 'info' - general suggestion. can't reliably identify deprecation/removal
 */
module.exports = {
    signatures: {
        /* HTML or similar Markup */
        markup: [
            { // OK
                pattern: /pure-[gu]/,
                messages: [
                    '"Pure CSS" grids have been deprecated.',
                    'Use the "Flexbox Grid" system provided by EncoreUI.',
                    `See ${lnFlexboxGrid} for more details.`
                ]
            }, { // OK
                pattern: /<rx-form-item/,
                messages: [
                    '<rx-form-item> is deprecated.',
                    `See ${lnMigrateRxForm}`
                ]
            }, { // OK
                pattern: /<rx-form-fieldset/,
                messages: [
                    '<rx-form-fieldset> is deprecated.',
                    `See ${lnMigrateRxForm}`
                ]
            }, { // OK
                pattern: /<rx-form-option-table/,
                messages: [
                    '<rx-form-option-table> is deprecated.',
                    'Use <rx-option-table> instead.'
                ]
            }, { // OK
                pattern: /<rx-active-url/,
                messages: [
                    '<rx-active-url> is slated for removal.',
                    'There is no replacement.'
                ]
            }, { // OK
                pattern: className('metadata'),
                messages: [
                    'The "metadata" class is deprecated.',
                    'Use a custom class name or <rx-metadata> instead.',
                    `See ${lnRxMetadata}`,
                ]
            }, { // OK
                // https://regex101.com/r/xS0sX4/1
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
                // https://regex101.com/r/kU4sN0/1
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
                // https://regex101.com/r/cX0yE4/1
                pattern: /cssSelector\s*:/,
                messages: [
                    'The "cssSelector" exercise option is deprecated.',
                    'Set the "instance" option with an ElementFinder value instead.'
                ]
            }, {
                // https://regex101.com/r/qY5rZ5/2
                pattern: /\.main\b/,
                messages: [
                    'The "main" property is deprecated.',
                    'Use the "initialize()" function instead.'
                ]
            }, {
                // https://regex101.com/r/cG5aI1/2
                pattern: /rxForm\.checkbox\b/,
                messages: [
                    'The "rxForm.checkbox" property is deprecated.',
                    'Use the "rxCheckbox" page object instead.'
                ]
            }, {
                // https://regex101.com/r/uX9kY2/3
                pattern: /rxForm\.currencyToPennies\b/,
                messages: [
                    'The "rxForm.currencyToPennies()" function is deprecated.',
                    'Use the "rxMisc.currencyToPennies()" function instead.'
                ]
            }, {
                // https://regex101.com/r/jO7xL9/2
                pattern: /rxForm\.dropdown\b/,
                messages: [
                    'The "rxForm.dropdown" property is deprecated.',
                    'Use the "rxSelect" page object instead.'
                ]
            }, {
                // https://regex101.com/r/bG3hD7/2
                pattern: /rxForm\.radioButton/,
                messages: [
                    'The "rxForm.radioButton" property is deprecated.',
                    'Use the "rxRadio" page object instead.'
                ]
            }, {
                // https://regex101.com/r/lX2fF4/3
                pattern: /rxForm\.slowClick\b/,
                messages: [
                    'The "rxForm.slowClick()" function is deprecated.',
                    'Use the "rxMisc.slowClick()" function instead.'
                ]
            }, {
                // https://regex101.com/r/pQ4wH8/5
                pattern: /\.form\.fill/,
                messages: [
                    'The "rxForm.form.fill()" function is deprecated.',
                    'Use the "rxForm.fill()" function instead.'
                ]
            }, {
                // https://regex101.com/r/wZ6dT0/2
                pattern: /encore\.rxOptionFormTable\b/,
                messages: [
                    'The "rxOptionFormTable" page object is deprecated.',
                    'Use the "rxOptionTable" page object instead.'
                ]
            }, {
                // This handles breadcrumb.visit() and tab.visit()
                // https://regex101.com/r/hJ3gD7/3
                pattern: /\.visit\b/,
                messages: [
                    'The "visit()" function is deprecated.',
                    'Use the "click()" function instead.'
                ]
            }, {
                // https://regex101.com/r/mE3rQ7/2
                pattern: /rxFloatingHeader\.compareXLocations\b/,
                messages: [
                    'The "rxFloatingHeader.compareXLocations()" function is deprecated.',
                    'Use the "rxMisc.compareXLocations()" function instead.'
                ]
            }, {
                // https://regex101.com/r/lD9zU6/2
                pattern: /rxFloatingHeader\.compareYLocations\b/,
                messages: [
                    'The "rxFloatingHeader.compareYLocations()" function is deprecated.',
                    'Use the "rxMisc.compareYLocations()" function instead.'
                ]
            }, {
                // https://regex101.com/r/jA2lZ4/3
                pattern: /rxFloatingHeader\.scrollToElement\b/,
                messages: [
                    'The "rxFloatingHeader.scrollToElement()" function is deprecated.',
                    'Use the "rxMisc.scrollToElement()" function instead.'
                ]
            }, {
                // https://regex101.com/r/wZ2nB8/2
                pattern: /rxFloatingHeader\.transformLocation\b/,
                messages: [
                    'The "rxFloatingHeader.transformLocation()" function is deprecated.',
                    'Use the "rxMisc.transformLocation()" function instead.'
                ]
            }, {
                // https://regex101.com/r/hI6eP2/2
                pattern: /rxOptionTable\.unselectByColumnText\b/,
                messages: [
                    'The "unselectByColumnText()" function is deprecated.',
                    'Use the "deselectByColumnText()" function instead.'
                ]
            }, {
                // https://regex101.com/r/iI0qI1/2
                pattern: /rxOptionTable\.unselectMany\b/,
                messages: [
                    'The "unselectMany()" function is deprecated.',
                    'Use the "deselectMany()" function instead.'
                ]
            }, {
                // https://regex101.com/r/nY3yF2/2
                pattern: /rxOptionTable\.unselectAll\b/,
                messages: [
                    'The "unselectAll()" function is deprecated.',
                    'Use the "deselectAll()" function instead.'
                ]
            }, {
                // handles rxOptionTable.row.unselect
                // handles rxCheckbox.unselect
                // https://regex101.com/r/fX5kC7/2
                pattern: /\.unselect\b/,
                messages: [
                    'The "unselect()" function is deprecated.',
                    'Use the "deselect()" function instead.'
                ]
            }, {
                // https://regex101.com/r/jY4xC5/2
                pattern: /\.isCollapsed\b/,
                messages: [
                    'The "isCollapsed()" function is deprecated.',
                    'Check the inverse of "isExpanded()" instead.'
                ]
            }, {
                // https://regex101.com/r/yA4eZ5/2
                pattern: /\.isDisabled\b/,
                messages: [
                    'The "isDisabled()" function is deprecated.',
                    'Check the inverse of "isEnabled()" instead.'
                ]
            }, {
                // https://regex101.com/r/lF1uA4/2
                pattern: /\.isClosed\b/,
                messages: [
                    'The "isClosed()" function is deprecated.',
                    'Check the inverse of "isOpen()" instead.'
                ]
            }, {
                // https://regex101.com/r/lW0cD1/2
                pattern: /\.isSymbolVisible\b/,
                messages: [
                    'The "isSymbolVisible()" function is deprecated.',
                    'Use the "isSymbolDisplayed()" function instead.'
                ]
            }, {
                // https://regex101.com/r/jN6iT8/2
                pattern: /\.isSearchable\b/,
                messages: [
                    'The "isSearchable()" function is deprecated.',
                    'Use the "isEnabled()" function instead.'
                ]
            }, {
                // https://regex101.com/r/rA2oI7/5
                pattern: /\.exists\b(?!\()/,
                messages: [
                    'The "exists" property has been deprecated.',
                    'Use the "isPresent()" function instead.'
                ]
            }, {
                // https://regex101.com/r/lY4yW1/2
                pattern: /\.getPerformanceMetrics\b/,
                messages: [
                    'The "getPerformanceMetrics()" function is deprecated.',
                    'There is no replacement.'
                ]
            }, {
                // https://regex101.com/r/eP3zN6/3
                pattern: /\.text\b(?!\()/,
                messages: [
                    'The "text" property has been deprecated.',
                    'Use the "getText()" function instead.'
                ]
            },
        ],
    }
}
