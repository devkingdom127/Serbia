import { useEffect, useState, useMemo } from 'react';
import TradeItem from '../../features/trade/product-item';
import Pagination from '../../features/trade/pagination';

let PageSize = 18;

export default function ItemBox(props) {
  const { items } = props;
  const [ arrayItems, setArraySelected ] = useState([]);
  const [ selectedItems, setSelected ] = useState([]);
  const [ filteredItems, setFilteredCurrent] = useState([]);
  const [ currentItems, setCurrent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [sortkey, setSortKey] = useState("");
  
  useEffect(() => {
    let tmp=[];
    if (items){
      Object.values(items).map((item, index) => {
        tmp.push(item);
      })
    }
    setFilteredCurrent(tmp);
    setArraySelected(tmp);
  }, [items]);

  useEffect(() => {
    let sortTemp = [];
      sortTemp = filteredItems.sort(function(a,b){
          var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
          return alc > blc ? 1 : alc < blc ? -1 : 0;
        })
        setFilteredCurrent([...sortTemp]);
  }, [sortkey]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrent(Object.values(filteredItems).slice(firstPageIndex, lastPageIndex));
  }, [filteredItems]);

  
  useEffect(() => {
    if(searchKey){
      
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      let tmpItems=[];
      if(arrayItems?.length > 0){
        tmpItems = arrayItems.filter((item) => item.name.toLowerCase().indexOf(searchKey.toLowerCase())>-1)
      }
      setFilteredCurrent(tmpItems);
    }
    else{
      let tmp=[];
      if (items){
        Object.values(items).map((item, index) => {
          tmp.push(item);
        })
      }
      setFilteredCurrent(tmp);
    }
  }, [searchKey]);

  const handleSearch=()=>{
    setSearchKey(event.target.value);
  }

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrent(filteredItems.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, selectedItems]);

  const handleSelected = (item, index) => () => {
    setSelected(selectedItems => [...selectedItems, item]);
    console.log("selected Item", selectedItems);
  }

  const handleSelectedSort = ()=>{
    if(event.target.value == "Name"){
      setSortKey("Name")
    }
  }

  const handleSelectedPaint =()=>{
    let tmp=[];
    if (items){
      Object.values(items).map((item, index) => {
        tmp.push(item);
      })
    }
    setFilteredCurrent(tmp);
    if(event.target.value == "Unpainted"){
      let tmp=[];
      if (items){
        Object.values(items).map((item, index) => {
          tmp.push(item);
        })
      }
      let paintTemp = [];
      paintTemp = tmp.filter((item)=>item.paintable == false);
      setFilteredCurrent(paintTemp);
    }
    else if(event.target.value != "Unpainted" && event.target.value != "Any"){
      let tmp=[];
      if (items){
        Object.values(items).map((item, index) => {
          tmp.push(item);
        })
      }
      let paintTemp = [];
      paintTemp = tmp.filter((item)=>item.paintable == true);
      setFilteredCurrent(paintTemp);
    }
  }

  const handleSelectedRaity =()=>{
    if(event.target.value == "Any"){
      let tmp=[];
      if (items){
        Object.values(items).map((item, index) => {
          tmp.push(item);
        })
      }
      setFilteredCurrent(tmp);
    }
    else{
      let tmp=[];
      if (items){
        Object.values(items).map((item, index) => {
          tmp.push(item);
        })
      }
      let raityTemp = [];
      raityTemp = tmp.filter((item)=>item.quality == event.target.value);
      setFilteredCurrent(raityTemp);
    }
  }

  const handleRemove =(val)=>{
    let remainItems=[];
    delete selectedItems[val];
    selectedItems.splice(val, 1);
    remainItems = selectedItems;
    console.log("remain", selectedItems);
    setSelected([...remainItems]);
  }

  return (
    <>
      <div className="toolbox offer pl-2 pr-1 sm:pl-3 sm:pr-3 lg:pl-7 lg:pr-7 lg:pt-7 mr-1 ml-1 mb-2" style={{ background: '#141414', height:"270px", overflowY:"scroll" }}>
        <div className='row justify-between col-span-12 lg:col-span-12'>
          <span>Your offer</span>
          <span><span className='val'>58</span> Credits</span>
        </div>
        <div className='row lg:pt-2'>
          {
            selectedItems.length > 0 && selectedItems.map((item, index) => (
              <div className='col-6 col-sm-4 col-xl-3 col-xxl-5 col-xxxl-6' key={`item-${index}`} onClick={()=>handleRemove(index)} >
                <TradeItem item={item} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="toolbox pl-2 pr-1 sm:pl-3 sm:pr-3 lg:pl-7 lg:pr-7 lg:pt-7 mr-1 ml-1 mb-2 mt-4 pb-10" style={{ background: '#141414' }}>
        <div className='flex'>
          <div className='flex w-2/6 bg-[#141414] border-2 p-2 mb-4' style={{borderColor:"#c2a46b", borderRadius:"3px"}}>
            <svg width="18" height="18" style={{marginTop:"2px"}} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5958 15.2288L13.2906 10.9231C13.9617 9.82141 14.3158 8.5558 14.3136 7.26574C14.3136 3.37252 10.9403 9.21306e-08 7.04745 9.21306e-08C6.12192 -0.000149575 5.20543 0.182053 4.35033 0.536201C3.49522 0.89035 2.71826 1.4095 2.06382 2.06401C1.40937 2.71852 0.890265 3.49556 0.53615 4.35074C0.182036 5.20593 -0.00014956 6.12251 9.21218e-08 7.04812C9.21218e-08 10.9402 3.37334 14.3139 7.26504 14.3139C8.51248 14.315 9.73759 13.983 10.8138 13.3522L15.1419 17.683C15.3454 17.886 15.6211 18 15.9086 18C16.1961 18 16.4718 17.886 16.6753 17.683L17.7496 16.6085C18.1723 16.1858 18.0185 15.6515 17.5958 15.2288ZM2.16915 7.04812C2.169 6.40733 2.29507 5.7728 2.54016 5.18075C2.78525 4.5887 3.14456 4.05073 3.59756 3.59757C4.05057 3.14442 4.5884 2.78495 5.18034 2.5397C5.77227 2.29444 6.40672 2.16821 7.04745 2.16821C9.74293 2.16821 12.1445 4.56886 12.1445 7.26574C12.1442 8.55988 11.63 9.80093 10.715 10.716C9.79999 11.6311 8.55906 12.1453 7.26504 12.1456C4.56956 12.1445 2.16915 9.74272 2.16915 7.04812Z" fill="white"/>
            </svg>
            <input type="text" placeholder="Search" className='w-24 ml-2 search' style={{backgroundColor:"#141414", borderWidth:"0px"}} onChange={()=>handleSearch()}></input>
          </div>
          <div className='w-1/6 bg-[#141414] border-2 p-1 mb-4 ml-4' style={{borderColor:"#c2a46b", borderRadius:"3px"}}>
            <div className='pl-1'>
              <p style={{fontSize:"10px", fontWeight:"unset", color:"#BCBCBC"}}>Sort By</p>
            </div>
            <select className='selectBox' style={{backgroundColor:"#141414",width:"70px" }} onChange={()=>handleSelectedSort()}>
              <option>Name</option>
              <option>Cheapest First</option>
              <option>Expensive First</option>
              <option>Newest</option>
            </select>
          </div>
          <div className='w-1/6 bg-[#141414] border-2 p-1 mb-4 ml-4' style={{borderColor:"#c2a46b", borderRadius:"3px"}}>
            <div className='pl-1'>
              <p style={{fontSize:"10px", fontWeight:"unset", color:"#BCBCBC"}}>Paint</p>
            </div>
            <select className='selectBox' style={{backgroundColor:"#141414",width:"70px" }} onChange={()=>handleSelectedPaint()}>
              <option>Any</option>
              <option>Unpainted</option>
              <option>Titanium White</option>
              <option>Black</option>
              <option>Grey</option>
              <option>Crimson</option>
              <option>Orange</option>
              <option>Burnt Sienna</option>
              <option>Saffron</option>
              <option>Lime Green</option>
              <option>Forest Green</option>
              <option>Pink</option>
              <option>Purple</option>
              <option>Cobalt</option>
              <option>Sky Blue</option>
            </select>
          </div>
          <div className='w-1/6 bg-[#141414] border-2 p-1 mb-4 ml-4' style={{borderColor:"#c2a46b", borderRadius:"3px"}}>
            <div className='pl-1'>
              <p style={{fontSize:"10px", fontWeight:"unset", color:"#BCBCBC"}}>Rarity</p>
            </div>
            <select className='selectBox' style={{backgroundColor:"#141414",width:"70px" }} onChange={()=>handleSelectedRaity()}>
              <option>Any</option>
              <option value="1">Black Market</option>
              <option value="2">Exotic</option>
              <option value="3">Import</option>
              <option value="4">Very Rare</option>
              <option value="5">Rare</option>
              <option value="6">Uncommon</option>
              <option value="7">Limited</option>
            </select>
          </div>
        </div>
        <div className='row' style={{ height:"578px", overflowY:"scroll", paddingBottom: "20px" }}>
          {
            filteredItems && Object.values(filteredItems).map(
              (item, index) => (
                <div 
                  className='col-6 col-sm-4 col-xl-3 col-xxl-5 col-xxxl-6' key={`item-${index}`}
                  onClick={handleSelected(item, index)}
                >
                  <TradeItem item={item} />
                </div> 
              )
            )
          }
        </div>
          {/* <Pagination
            className="pagination-bar justify-center"
            currentPage={currentPage}
            totalCount={Object.keys(filteredItems).length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          /> */}
      </div>
    </>
  )
}
