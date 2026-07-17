import {defineField, defineType} from 'sanity'

export const valueProposition = defineType({
  name: 'valueProposition',
  title: 'Value Proposition Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Value Proposition Cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'localeText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'icon', title: 'Icon Name', type: 'string'}),
            defineField({name: 'order', title: 'Order', type: 'number'}),
          ],
          preview: {
            select: {
              title: 'title.el',
              titleEn: 'title.en',
              icon: 'icon',
              order: 'order',
            },
            prepare({title, titleEn, icon, order}) {
              return {
                title: title || titleEn || 'Card',
                subtitle: [icon, order != null ? `Order ${order}` : ''].filter(Boolean).join(' · '),
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline.el',
      titleEn: 'headline.en',
      cardCount: 'cards.length',
    },
    prepare({title, titleEn, cardCount}) {
      const count = typeof cardCount === 'number' ? cardCount : 0
      return {
        title: title || titleEn || 'Value Proposition',
        subtitle: count ? `${count} card${count === 1 ? '' : 's'}` : 'No cards',
      }
    },
  },
})
