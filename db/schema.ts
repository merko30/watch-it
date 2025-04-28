import {
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  varchar
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }),
  resetPasswordToken: varchar({ length: 255 }),
  resetPasswordExpires: varchar({ length: 255 })
})

export const statusEnum = pgEnum('status', [
  'wishlist',
  'watching',
  'watched',
  'watch-again'
])

export const typeEnum = pgEnum('type', ['movie', 'tv'])

export const movies = pgTable('movies', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  status: statusEnum().default('watching'),
  tmdbId: integer().notNull().unique(),
  tmdbType: typeEnum().notNull(),
  details: json(),
  description: text(),
  genres: varchar({ length: 255 }).array(),
  rating: integer(),
  image: varchar({ length: 255 }),
  userId: integer()
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade' // delete all movies if user is deleted
    })
})
