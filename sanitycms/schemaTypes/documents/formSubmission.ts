import {defineField, defineType} from 'sanity'

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [{title: 'Contact', value: 'contact'}],
      },
      readOnly: true,
    }),
    defineField({name: 'firstName', title: 'First Name', type: 'string', readOnly: true}),
    defineField({name: 'lastName', title: 'Last Name', type: 'string', readOnly: true}),
    defineField({name: 'fullName', title: 'Full Name', type: 'string', readOnly: true}),
    defineField({name: 'companyName', title: 'Company', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Phone', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 4, readOnly: true}),
    defineField({name: 'privacyAccepted', title: 'Privacy Accepted', type: 'boolean', readOnly: true}),
    defineField({name: 'read', title: 'Read', type: 'boolean', initialValue: false}),
    defineField({name: 'starred', title: 'Starred', type: 'boolean', initialValue: false}),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      fullName: 'fullName',
      companyName: 'companyName',
      read: 'read',
    },
    prepare({firstName, lastName, fullName, companyName, read}) {
      const title = fullName || [firstName, lastName].filter(Boolean).join(' ') || 'Submission'
      return {
        title: read ? title : `🔵 ${title}`,
        subtitle: companyName || 'Contact form',
      }
    },
  },
})
