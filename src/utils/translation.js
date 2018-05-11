/**
 taken from: https://sprite-storm.com/tutorial/phaser-tutorial/phaser-language-translator-plugin/
*/

export default class Translation {
  /**
  * Constructor for Translation
  *
  * @param {Object} cache Reference to the Cache Object
  * @param {Object} translations The translations from your JSON object
  */
  constructor(cache, translations) {
    this.defaultLanguage = 'en'
    this.availableLanguages = ['en', 'es']
    this.translations = cache.json.get(translations)

    // check for user language
    let preferredLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || this.defaultLanguage
    // check if valid or not
    if (preferredLanguage === null || preferredLanguage === undefined || preferredLanguage === false || typeof (preferredLanguage) !== 'string') {
      this.languageCode = this.defaultLanguage
        // if valid, then get first 2 chars of languag code
    } else if (preferredLanguage.length > 2) {
      this.languageCode = preferredLanguage.substr(0, 2)
      // already valid and only 2 characters long
    } else {
      this.languageCode = preferredLanguage
    }

    // if the language code is not in the available languages, then use the default language
    if(!this.contains(this.availableLanguages, this.languageCode)) {
      this.languageCode = this.defaultLanguage
    }
  }

  /**
  * @description Returns a string translation
  *
  * @param {string} val the text to translate
  *
  * @returns {string}
  */
  translate(val) {
    if(this.translations[this.languageCode][val]) {
      return this.translations[this.languageCode][val]
    } else {
      return '-'
    }
    }

  /**
  * @description loops through a given array and checks if the passed value is matched anywhere
  *
  * @param {array} arr Array to loop over
  * @param {string} val value to compare
  *
  * @returns {boolean}
  */
  contains(arr, val) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] == val) {
        return true
      }
    }
    return false
  }
}