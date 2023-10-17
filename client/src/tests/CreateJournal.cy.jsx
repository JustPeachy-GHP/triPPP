describe("CreateJournalForm Component", () => {
  it("allows the user to create a journal entry", () => {
    cy.get("#trip-select").select("European Adventure");
    cy.get("#videocontent").type("https://www.youtube.com/watch?v=video1");
    cy.get("#image-text").type(
      "https://www.reuters.com/resizer/-K5JWbCI58lWSmK0kXXS7ECII6Y=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg"
    );
    cy.get("#title").type("Exploring Paris");
    cy.get("#entry-text").type(
      "Today was a day I will forever hold dear. As the morning sun gently kissed the streets of Paris, I ventured out into the enchanting city. The Eiffel Tower, standing tall and majestic, was my first stop. Seeing this iconic symbol of France up close was a dream come true. Its intricate lattice structure against the clear blue sky left me in awe. Afterward, I found a cozy café tucked away on a charming Parisian street. With a view of the Eiffel Tower in the distance, I savored a fresh croissant, warm from the oven. Its delicate layers melted in my mouth, a taste of pure Parisian delight. Today's experience was a perfect blend of history, culture, and culinary delight, making my time in Paris truly unforgettable."
    );
    cy.get("form").submit();

    cy.contains("New journal has been created!");
  });

  it("displays an error message if no trip is selected", () => {
    cy.get("form").submit();
  });
});
