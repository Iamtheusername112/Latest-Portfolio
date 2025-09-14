const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

async function createHeroData() {
  try {
    console.log('🔧 Creating hero data...');
    
    // Create database connection
    const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DXY9OhAjNv5r@ep-wandering-cherry-agjevspd-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = postgres(connectionString);
    const db = drizzle(client);
    
    // Insert hero data
    const heroData = {
      name: "Iwu Francis",
      title: "Full Stack Web Developer",
      description: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.",
      cv_url: "/cv.pdf",
      profile_image_url: "",
      background_image_url: "",
      background_video_url: "",
      background_type: "gradient",
      primary_button_text: "View My Work",
      primary_button_action: "scroll",
      primary_button_link: "",
      secondary_button_text: "Download CV",
      secondary_button_action: "download",
      secondary_button_link: "/cv.pdf",
      show_scroll_indicator: true,
      scroll_indicator_text: "Scroll Down",
      social_links: {
        github: "https://github.com/Iamtheusername112",
        linkedin: "https://linkedin.com/in/francis-iwu-878973238",
        instagram: "https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3",
        email: "mailto:iwufrancis571@gmail.com"
      },
      custom_css: "",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await client`
      INSERT INTO hero_content (
        name, title, description, cv_url, profile_image_url, background_image_url, 
        background_video_url, background_type, primary_button_text, primary_button_action, 
        primary_button_link, secondary_button_text, secondary_button_action, 
        secondary_button_link, show_scroll_indicator, scroll_indicator_text, 
        social_links, custom_css, is_active, created_at, updated_at
      ) VALUES (
        ${heroData.name}, ${heroData.title}, ${heroData.description}, ${heroData.cv_url}, 
        ${heroData.profile_image_url}, ${heroData.background_image_url}, 
        ${heroData.background_video_url}, ${heroData.background_type}, 
        ${heroData.primary_button_text}, ${heroData.primary_button_action}, 
        ${heroData.primary_button_link}, ${heroData.secondary_button_text}, 
        ${heroData.secondary_button_action}, ${heroData.secondary_button_link}, 
        ${heroData.show_scroll_indicator}, ${heroData.scroll_indicator_text}, 
        ${JSON.stringify(heroData.social_links)}, ${heroData.custom_css}, 
        ${heroData.is_active}, ${heroData.created_at}, ${heroData.updated_at}
      ) RETURNING *
    `;

    console.log('✅ Hero data created successfully!');
    console.log('Result:', result[0]);
    
    // Close connection
    await client.end();
    
  } catch (error) {
    console.error('❌ Error creating hero data:', error);
  }
}

createHeroData();
