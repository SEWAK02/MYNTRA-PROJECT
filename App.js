import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "./Components/Navbar";
import CardDesign from "./Components/CardDesign";
import Radio from "./Components/Radio";
import Checkbox from "./Components/Checkbox";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedGen, setSelectedGen] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedSearch,setSelectedSearch] = useState("");

  const getData = () => {
    fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
      .then((response) => response.json())
      .then((data) => data.products)
      .then((data) => {
        setProducts(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  var showGender = [];
  products.forEach((elem) => {
    showGender.push(elem.gender);
  });

  showGender = new Set(showGender);
  var genFinal = [];
  for (let elem of showGender) {
    genFinal.push(elem);
  }

  var showBrand = [];
  products.forEach((elem) => {
    showBrand.push(elem.brand);
  });

  showBrand = new Set(showBrand);
  var brandFinal = [];
  for (let elem of showBrand) {
    brandFinal.push(elem);
  }

  var showCategory = [];
  products.forEach((elem) => {
    showCategory.push(elem.category);
  });

  showCategory = new Set(showCategory);
  var catFinal = [];
  for (let elem of showCategory) {
    catFinal.push(elem);
    catFinal.sort();
  }

  const updateGender = (event) => {
    setSelectedGen(event.target.value);
  };

  const updateBrand = (event) => {
    if (event.target.checked) {
      setSelectedBrand([...selectedBrand, event.target.value]);
    } else {
      setSelectedBrand(
        selectedBrand.filter((elem) => elem !== event.target.value)
      );
    }
   
  };

  const updateCat = (event) => {
    if (event.target.checked) {
      setSelectedCat([...selectedCat, event.target.value]);
    } else {
      setSelectedCat(selectedCat.filter((elem) => elem !== event.target.value));
    }
  };
  const updateSearch=(event)=>{
    setSelectedSearch(event.target.value)
  }

 
   const filterSidebar=()=>{
if(selectedGen.length ===0 && selectedBrand.length ===0 && selectedCat.length ===0 && selectedSearch ===""){
return products
}else if (selectedGen.length !==0){
  if(selectedBrand.length !==0 & selectedCat.length !==0){
    return products
    .filter((product)=>selectedGen.includes(product.gender))
    .filter((product)=>selectedBrand.includes(product.brand))
    .filter((product)=>selectedCat.includes(product.category))
  }else if (selectedGen.length !==0 && selectedBrand.length !==0){
    return products
    .filter((product)=>selectedGen.includes(product.gender))
    .filter((product)=>selectedBrand.includes(product.brand))
}else if(selectedGen.length!==0 & selectedCat.length!==0){
  return products
  .filter((product)=>selectedGen.includes(product.gender))
  .filter((product)=>selectedCat.includes(product.category))
}return products
.filter((product)=>selectedGen.includes(product.gender))
}else if(selectedBrand.length!==0){
if(selectedBrand.length!==0 && selectedCat.length !==0){
return products
.filter((product)=>selectedBrand.includes(product.brand))
.filter((product)=>selectedCat.includes(product.category))
}return products
.filter((product)=>selectedBrand.includes(product.brand))

}else if(selectedCat.length!==0){
  return products
  .filter((product)=>selectedCat.includes(product.category))

}else if (selectedSearch !== "") {
  return products.filter((product) => product.product.toLowerCase().includes(selectedSearch.toLowerCase()))
}

   }
  

  return (
    <>
      <Navbar onChange={updateSearch} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 border">
            <div className="col-md-12 p-2">
              <h6>FILTER</h6>
              {genFinal.map((val) => {
                return <Radio value={val} label={val} onClick={updateGender} />;
              })}
            </div>
            <div className="col-md-12 p-2">
              <h6>BRAND</h6>
              {brandFinal.map((val) => {
                return (
                  <Checkbox value={val} label={val} onClick={updateBrand} />
                );
              })}
            </div>
            <div className="col-md-12 p-2">
              <h6>CATEGORY</h6>
              {catFinal.map((val) => {
                return (
                  <Checkbox value={val} label={val} onClick={updateCat} />
                ) 
              })}
            </div>
          </div>
          <div className="col-md-10">
          {filterSidebar().map((val) => {
                return (
                      <CardDesign
                      img={val.searchImage}
                      product={val.product}
                      sizes={val.sizes}
                      mrp={val.mrp}
                      price={val.price}
                      dis={val.discountDisplayLabel}
                    />
                      );
              })}
            
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default App;