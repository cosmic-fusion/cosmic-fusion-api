class getZodiacCombination {

  constructor(dob, sex){
    this.dob = dob;
    this.sex = sex;
    if (!dob.includes("/")) {
        throw new Error("DOB has not been passed in the correct format. Please ensure dob is separated by '/'");
    }
    this.dateArray = dob.split("/");
    this.day = Number(this.dateArray[0]);
    this.month = Number(this.dateArray[1]);
    this.year = Number(this.dateArray[2]);
    this.yearSuffix = Number(dob.slice(-1));
    this.cny_start_dates = ["06/02", "26/01", "14/02", "03/02", "23/01", "10/02", "30/01", "18/02", "08/02", "27/01", "15/02", "05/02", "25/01", "11/02", "31/01", "19/02", "09/02", "29/01", "17/02"]
}
    
    cny_start_date(year){
      const base_start_year = 10000
      const cycle_number = 19
      const gap = base_start_year + year
      const closest_year = (Math.floor(gap / cycle_number) * 19) - year
      const difference = base_start_year - closest_year
      const start_date = this.cny_start_dates[difference]
      return start_date
    }

    western(day, month){
        const zodiacSigns = {
            "capricorn":{"western": "Capricorn", "westernId": 10},
            "aquarius":{"western": "Aquarius", "westernId": 11},
            "pisces": {"western": "Pisces", "westernId": 12},
            "aries": {"western": "Aries", "westernId": 1},
            "taurus":{"western": "Taurus", "westernId": 2},
            "gemini":{"western": "Gemini", "westernId": 3},
            "cancer": {"western": "Cancer", "westernId": 4},
            "leo": {"western": "Leo", "westernId": 5},
            "virgo": {"western": "Virgo", "westernId": 6},
            "libra": {"western": "Libra", "westernId": 7},
            "scorpio" : {"western": "Scorpio", "westernId": 8},
            "sagittarius": {"western": "Sagittarius", "westernId": 9}
          }
        
          if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
            return zodiacSigns.capricorn;
          } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return zodiacSigns.aquarius;
          } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return zodiacSigns.pisces;
          } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return zodiacSigns.aries;
          } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return zodiacSigns.taurus;
          } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return zodiacSigns.gemini;
          } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return zodiacSigns.cancer;
          } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return zodiacSigns.leo;
          } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return zodiacSigns.virgo;
          } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return zodiacSigns.libra;
          } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return zodiacSigns.scorpio;
          } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return zodiacSigns.sagittarius;
          }
    }

    element(yearSuffix) {
        switch (yearSuffix) {
            case 0:
            case 1:
                return {"element": "Metal", "elementId": 0};
            case 2:
            case 3:
                return {"element": "Water", "elementId": 2};
            case 4:
            case 5:
                return {"element": "Wood", "elementId": 4};
            case 6:
            case 7:
                return {"element": "Fire", "elementId": 6};
            case 8:
            case 9:
                return {"element": "Earth", "elementId": 8};
        }
    }

    calculateAnimalData(year){
        if (year < -10001) {
          throw new Error("Sorry! You can't go further than 10,000 BC");
        }
        const finalYear = year < 4 ? 12 - (Math.abs(year - 4) % 12) : (year - 4) % 12
        console.log(finalYear)
        switch (finalYear) {
            case 0:
                return {"animal": "Rat", "animalId": 4};
            case 1:
                return {"animal": "Ox", "animalId": 5};
    
            case 2:
                return {"animal": "Tiger", "animalId": 6};
    
            case 3:
                return {"animal": "Hare", "animalId": 7};
    
            case 4:
                return {"animal": "Dragon", "animalId": 8};
    
            case 5:
                return {"animal": "Snake", "animalId": 9};
    
            case 6:
                return {"animal": "Horse", "animalId": 10};
    
            case 7:
                return {"animal": "Goat", "animalId": 11};
    
            case 8:
                return {"animal": "Monkey", "animalId": 0};
    
            case 9:
                return {"animal": "Rooster", "animalId": 1};
    
            case 10:
                return {"animal": "Dog", "animalId": 2};
    
            case 11:
                return {"animal": "Pig", "animalId": 3};
        }
    }

    getAnimalData(){
      var cnyDateArray = this.cny_start_date(this.year).split("/")
      const cnyDay = Number(cnyDateArray[0])
      const cnyMonth = Number(cnyDateArray[1])
      var animal
      if( (this.month < cnyMonth) || (this.day < cnyDay && this.month == cnyMonth) ){
        animal = this.calculateAnimalData(this.year -1)
      } else {
        animal = this.calculateAnimalData(this.year)
      }
      return animal
    }

    getInfo() {
        const westernData = this.western(this.day, this.month)
        const elementData = this.element(this.yearSuffix)
        const animalData = this.getAnimalData(this.year)
        const trio = `${westernData.western} ${elementData.element} ${animalData.animal}`
        const element_animal_duo = `${elementData.element} ${animalData.animal}`
        const obj = {
            ...westernData,
            ...elementData,
            ...animalData,
            ...{"sex": this.sex},
            ...{"trio": trio},
            ...{"element_animal_duo": element_animal_duo},
            ...{"start_date": this.cny_start_date(this.year)}
        }
        return obj
    }
}

module.exports = getZodiacCombination;