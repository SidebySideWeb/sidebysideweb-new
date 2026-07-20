import {defineField, defineType} from 'sanity'

export const caseStudyChallenge = defineType({
  name: 'caseStudyChallenge',
  title: 'Challenge',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'body', title: 'Body', type: 'localeText', rows: 4}),
    defineField({
      name: 'severity',
      title: 'Severity',
      type: 'localeString',
      description: 'Optional, e.g. Υψηλή (strategy layout)',
    }),
  ],
  preview: {
    select: {title: 'title.el'},
  },
})

export const caseStudyStat = defineType({
  name: 'caseStudyStat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. 4+, ~90%, $19,99/μήνα'}),
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({
      name: 'animate',
      title: 'Animate counter',
      type: 'boolean',
      initialValue: true,
      description: 'Off for text values or intentional 0 / currency with commas',
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label.el'},
  },
})

export const caseStudyBeforeAfter = defineType({
  name: 'caseStudyBeforeAfter',
  title: 'Before → After',
  type: 'object',
  fields: [
    defineField({name: 'before', title: 'Before', type: 'localeString'}),
    defineField({name: 'after', title: 'After', type: 'localeString'}),
  ],
  preview: {
    select: {before: 'before.el', after: 'after.el'},
    prepare({before, after}) {
      return {title: `${before ?? ''} → ${after ?? ''}`}
    },
  },
})

export const caseStudyProcessStep = defineType({
  name: 'caseStudyProcessStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeString'}),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'description.el'},
  },
})

export const caseStudyRoleItem = defineType({
  name: 'caseStudyRoleItem',
  title: 'Role Item',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'body', title: 'Body', type: 'localeText', rows: 3}),
  ],
  preview: {
    select: {title: 'title.el'},
  },
})

export const caseStudyOutcome = defineType({
  name: 'caseStudyOutcome',
  title: 'Outcome',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'body', title: 'Body', type: 'localeText', rows: 3}),
  ],
  preview: {
    select: {title: 'title.el'},
  },
})
