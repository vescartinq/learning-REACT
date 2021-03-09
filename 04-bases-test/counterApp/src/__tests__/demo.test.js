describe('Test on demo.test.js', () => {
  test('should be true', () => {
    // arrange
    const isActive = true;
    //   act
    // assert
    expect(isActive).toBe(true);
  });

  test('two strings should be equal', () => {
    // arrange
    const message = 'Hola Mundo';
    // act
    const message2 = `Hola Mundo`;
    // assert
    expect(message).toBe(message2);
  });
});
