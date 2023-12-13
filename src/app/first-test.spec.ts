describe("first test",()=>{
    let testVar: any;
    beforeEach(()=>{
        testVar={}
    })
    it("should return true is a is present",()=>{
        //arrange
        testVar.a = false
        //act
        testVar.a = true
        //assert
        expect(testVar.a).toBe(true)
    })
})