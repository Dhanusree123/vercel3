
export const getASIN = (url: string) => {
    const queryParts = url.split('?');
    const newUrl = queryParts[0] ? queryParts[0] : '';
    let asin = '';
  
    let splitter = '/dp/';
    if (newUrl.includes('/gp/product/')) {
      splitter = '/gp/product/';
    }
    const urlParts = newUrl.split(splitter);
    if (urlParts[1]) {
      const asinParts = urlParts[1].split('/');
      asin = asinParts[0] ? asinParts[0] : '';
    }
    return asin;
  };

  
export const generateSlug = (input: string): string => {
    if (!input) return '';
    return input
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w\s-]/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

export const transformImageUrl = (url:string,size=300)=>{
  if(!url) return '';
  return url.split('._S')[0] + `._SY${size}_.jpg`;

}  

export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const getLabelFromPath = (path: string) => {
  return path.replace('_', '').replace('-', ' ').replace('_', ' > ');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObjectKeyValue = (item:any,key:string,defaultValue?:any)=>{
  let value;
  const paths = key.split('.');
  value = paths.reduce((acc,part)=>acc && acc[part],item);
  if(value === undefined){
    value = defaultValue
  }
  return value;
}
