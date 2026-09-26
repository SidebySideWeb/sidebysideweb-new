import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Portable Text for the v2 site. Decorators map to the prototype styles:
 * highlight = marigold text, strike = the struck word in the manifesto,
 * thin = weight 200 inside big headlines.
 */
export const richTextV2 = defineType({
  name: 'richTextV2',
  title: 'Κείμενο',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Παράγραφος', value: 'normal'}],
      lists: [{title: 'Λίστα', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Highlight (marigold)', value: 'highlight'},
          {title: 'Strike', value: 'strike'},
          {title: 'Thin', value: 'thin'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Σύνδεσμος',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL ή path',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'blank',
                title: 'Άνοιγμα σε νέα καρτέλα',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
  ],
})
