const editor = new EditorJS({
  /**
   * Id de l'élément conteneur
   */
  holder: 'editorjs',

  /**
   * Message par défaut
   */
  placeholder: 'Commencer à écrire...',

  logLevel: 'ERROR',

  /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */ 
    tools: {
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            config: {
                placeholder: 'Placer votre titre',
                levels: [2, 3, 4],
                defaultLevel: 3
            }
        },
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/administrateur/upload-image-temp' // backend file uploader endpoint
                },
                field: 'image',
            }
        },
        list: EditorjsList,
        linkTool: LinkTool,
        embed: Embed,
        textStyle: {
            class: EditorJSTextStyle,
            config: {
                fontSizeEnabled: true,
                fontFamilyEnabled: true,
                fontSizes: [
                    { label: "12px", value: "12px" },
                    { label: "14px", value: "14px" },
                    { label: "16px", value: "16px" },
                    { label: "18px", value: "18px" },
                    { label: "20px", value: "20px" },
                ],
                fontFamilies: [
                    { label: "Arial", value: "Arial" },
                    { label: "Georgia", value: "Georgia" },
                    { label: "Courier New", value: "Courier New" },
                    { label: "Roboto", value: "Roboto" },
                ],
                defaultFontSize: "14px",
                defaultFontFamily: "Roboto",
            },
        },
    },

    onReady: () => {
        console.log('Editor.js is ready to work!')
    },

    i18n: {
        /**
         * Other below keys are optional.
         * @type {I18nDictionary}
         */
        messages: {
            ui: {
                "blockTunes": {
                    "toggler": {
                        "Click to tune": "Clique pour modifier",
                        "or drag to move": "ou glisse pour déplacer"
                    },
                },
                "inlineToolbar": {
                    "converter": {
                        "Convert to": "Convertir en"
                    }
                },
                "toolbar": {
                    "toolbox": {
                        "Add": "Ajouter"
                    }
                }
            },
            toolNames: {
                "Text": "Texte",
                "Heading": "Titre",
                "Unordered List": "Liste non ordonnée",
                "Ordered List" : "Liste ordonnée",
                "Table": "Tableau",
                "Link": "Lien",
                "Marker": "Surligneur",
                "Image": "Image",
                "textStyle": "Style de texte",
            },
            tools: {
                "warning": {
                    "Title": "Titre",
                    "Message": "Message",
                },
                "linkTool": {
                    "Add a link": "Ajouter un lien"
                },
                "stub": {
                    'The block can not be displayed correctly.': 'Le bloc ne peut pas être affiché correctement.'
                }
            },
            blockTunes: {
                "delete": {
                    "Delete": "Supprimer"
                },
            }
        }
    }
});