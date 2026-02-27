# Content Types Schema Definition (Strapi/Payload Compatible)

## 1. Global Settings

Singleton type for global site configuration.

- **Site Name**: Text
- **SEO Default Title**: Text
- **SEO Default Description**: Text area
- **Contact Email**: Email
- **Social Links**: Repeater (Platform: Select, URL: Text)

## 2. Page: Home

Singleton for Home Page content.

- **Hero Section**:
  - Headline: Text
  - Subheadline: Text
  - Background Image: Media
  - CTA Label: Text
  - CTA Link: Text
- **Introduction**:
  - Title: Text
  - Text: Rich Text
  - Image: Media

## 3. Product Category

Collection Type.

- **Name**: Text (Required)
- **Slug**: UID (Required)
- **Description**: Text Area

## 4. Product

Collection Type.

- **Name**: Text (Required)
- **Slug**: UID (Required)
- **Category**: Relation (One-to-One with Product Category)
- **Description**: Rich Text
- **Images**: Media (Multiple)
- **Is Featured**: Boolean (for Home page preview)
- **Nutritional Info**: Component
  - Serving Size: Text
  - Calories: Text
  - Carbs: Text
  - Protein: Text
  - Fat: Text

## 5. Post (Content Hub)

Collection Type.

- **Title**: Text (Required)
- **Slug**: UID (Required)
- **Type**: Select (Blog, Evento, Treinamento) - Required
- **Cover Image**: Media
- **Excerpt**: Text Area (Short summary)
- **Content**: Rich Text (Main body)
- **Date**: Date (Publication date)
- **Author**: Text
- **Is Featured**: Boolean

### Conditional Fields (Group: Event Metadata)

_Visible if Type == Evento_

- **Event Date**: DateTime
- **Location**: Text
- **Status**: Select (Future, Happening, Finished)

### Conditional Fields (Group: Training Metadata)

_Visible if Type == Treinamento_

- **Target Audience**: Text
- **Format**: Select (Online, Presencial)
- **Hours**: Text

## 6. Form Submission (Contact)

Collection Type (Read-only for users).

- **Name**: Text
- **Email**: Email
- **Subject**: Text
- **Message**: Text Area
- **Timestamp**: DateTime
- **Status**: Select (New, Read, Replied)
