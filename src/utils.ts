/* eslint-disable import/no-anonymous-default-export */
export const URL = 'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/LOGO.png?alt=media&token=8b525aca-b296-4e41-8216-219f1af79fc5';
export const InputBoxSize:'small' | 'medium' | undefined = 'small';
export const GoogleAnalytics = (form:any, pageUrl: any, title: any = '', data: any = {}) => {
    const windowobj:any = window;
    if (form.testSelection === 'general' || form.testSelection === "flight") {
        windowobj?.dataLayer?.push({
            'event': 'pageview',
            pageUrl,title,
            ...data
        });
    }
}
const payerName =[
    { label: 'AARP', value: 'AARP' },
    { label: 'Aetna', value: 'Aetna' },
    { label: 'American Family Insurance', value: 'American Family Insurance' },
    {
      label: 'American National Insurance Company',
      value: 'American National Insurance Company',
    },
    { label: 'Amerigroup', value: 'Amerigroup' },
    { label: 'Anthem', value: 'Anthem' },
    { label: 'Bankers Life and Casualty', value: 'Bankers Life and Casualty' },
    {
      label: 'Blue Cross and Blue Shield Association',
      value: 'Blue Cross and Blue Shield Association',
    },
    { label: 'Cambia Health Solutions', value: 'Cambia Health Solutions' },
    { label: 'CareSource', value: 'CareSource' },
    { label: 'Centene Corporation', value: 'Centene Corporation' },
    { label: 'Cigna', value: 'Cigna' },
    { label: 'Conseco', value: 'Conseco' },
    { label: 'Coventry Health Care', value: 'Coventry Health Care' },
    { label: 'Delta Dental', value: 'Delta Dental' },
    { label: 'EmblemHealth', value: 'EmblemHealth' },
    { label: 'Fidelis Care', value: 'Fidelis Care' },
    { label: 'Fortis', value: 'Fortis' },
    { label: 'Geisinger', value: 'Geisinger' },
    {
      label: 'Golden Rule Insurance Company',
      value: 'Golden Rule Insurance Company',
    },
    { label: 'Group Health Cooperative', value: 'Group Health Cooperative' },
    { label: 'Group Health Incorporated', value: 'Group Health Incorporated' },
    {
      label: 'Harvard Pilgrim Health Care',
      value: 'Harvard Pilgrim Health Care',
    },
    { label: 'Health Net', value: 'Health Net' },
    { label: 'HealthMarkets', value: 'HealthMarkets' },
    { label: 'HealthPartners', value: 'HealthPartners' },
    { label: 'HealthSpring', value: 'HealthSpring' },
    { label: 'Highmark', value: 'Highmark' },
    {
      label: 'Horace Mann Educators Corporation',
      value: 'Horace Mann Educators Corporation',
    },
    { label: 'Humana', value: 'Humana' },
    { label: 'Independence Blue Cross', value: 'Independence Blue Cross' },
    { label: 'Kaiser Permanente', value: 'Kaiser Permanente' },
    { label: 'Kaleida Health', value: 'Kaleida Health' },
    { label: 'Liberty Medical', value: 'Liberty Medical' },
    { label: 'MassHealth', value: 'MassHealth' },
    { label: 'Medi-cal', value: 'Medi-cal' },
    { label: 'Medicaid', value: 'Medicaid' },
    { label: 'Medical Mutual of Ohio', value: 'Medical Mutual of Ohio' },
    {
      label: 'MEGA Life and Health Insurance',
      value: 'MEGA Life and Health Insurance',
    },
    { label: 'Molina Healthcare', value: 'Molina Healthcare' },
    { label: 'Mutual of Omaha', value: 'Mutual of Omaha' },
    { label: 'Oscar Health', value: 'Oscar Health' },
    { label: 'Oxford Health Plans', value: 'Oxford Health Plans' },
    { label: 'Premera Blue Cross', value: 'Premera Blue Cross' },
    { label: 'Principal Financial Group', value: 'Principal Financial Group' },
    { label: 'Shelter Insurance', value: 'Shelter Insurance' },
    { label: 'State Farm', value: 'State Farm' },
    {
      label: 'Thrivent Financial for Lutherans',
      value: 'Thrivent Financial for Lutherans',
    },
    {
      label: 'United American Insurance Company',
      value: 'United American Insurance Company',
    },
    { label: 'UnitedHealth Group', value: 'UnitedHealth Group' },
    { label: 'Unitrin', value: 'Unitrin' },
    {
      label: 'Universal American Corporation',
      value: 'Universal American Corporation',
    },
    { label: 'WellCare', value: 'WellCare' },
    { label: 'Other', value: 'Other' },
  ]
export function hexToRGB(hex: string, alpha?: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}${alpha !== undefined ? `, ${alpha}` : ''})`;
}
export enum Breakpoints {
    lsm = 220,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1500,
  }  
export const formatPhoneNumber = (phone='',plus=true)=>{
    if(plus)
    {
        if(phone.startsWith("+")) return phone;
        if(phone.startsWith("1")) return "+"+phone;
        if(phone.length === 10) return "+1"+phone;
        if(phone.length>=11) return "+"+phone;
    }else{
        if(phone.startsWith("+")) return phone;
        if(phone.startsWith("1")) return phone;
        if(phone.length === 10) return "1"+phone;
        if(phone.length>=11) return phone;
    }
}
export const testTypeItems = [
      {
        id: 1,
        testType: 'rapid',
        title: 'Rapid',
        prices: 250,
        isCostLabelVisibile: true,
        testDuration: 'Results within 1.5 hours',
        isDuretionVisible: true,
        isExpress: false,
        isAntigen: false,
        isRapid: true,
        disabled:true,
        standardTest: false,
        hidden:true
      },
      {
        id: 2,
        testType: 'express',
        title: 'Express',
        prices: 150,
        isCostLabelVisibile: true,
        testDuration: 'Results within 12 hours',
        isDuretionVisible: true,
        isExpress: true,
        isAntigen: false,
        isRapid: false,
        standardTest: false,
        disabled:false,
        hidden:true
      },
      {
        id: 3,
        testType: 'standard',
        title: 'Standard',
        prices: 90,
        isCostLabelVisibile: false,
        testDuration: 'Results within 24 hours',
        isDuretionVisible: true,
        isExpress: false,
        isAntigen: false,
        disabled:false,
        isRapid: false,
        standardTest: true,
        hidden:false
      },
      {
        id: 4,
        testType: 'antigen',
        title: 'Antigen',
        prices: 75,
        isCostLabelVisibile: true,
        testDuration: 'Results within 30 minutes',
        isDuretionVisible: true,
        disabled:true,
        isExpress: false,
        isAntigen: true,
        isRapid: false,
        standardTest: false,
        hidden:true
      },
    ];

    export const Contacts = [{
        label: "Your Mobile",
        required: true,
        param: "phone",
        hidden: false,
        type: "number",
        name: "phone",
    },
    {
        label: "Your Email",
        required: true,
        param: "email",
        hidden: false,
        type: "text",
        name: "email",
    }]
    export const PersonalInfo = [{
        label: "First Name",
        required: true,
        param: "personalInfo",
        hidden: false,
        type: "text",
        name: "firstName",
    },
    {
        label: "Middle Name",
        required: false,
        param: "personalInfo",
        hidden: false,
        type: "text",
        name: "middleName",
    },
    {
        label: "Last Name",
        required: true,
        param: "personalInfo",
        hidden: false,
        type: "text",
        name: "lastName",
    },
    {
        label: "Date of Birth",
        required: true,
        param: "personalInfo",
        hidden: false,
        type: "date",
        name: "birthDate",
    }
];
export const moreDetails = [
    {
        label: "Sex",
        required: true,
        param: "moreDetails",
        hidden: false,
        type: "string",
        name: "sex",
        list:[
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' },
            {
              label: 'Prefer not to state',
              value: 'Prefer not to state',
            },
          ]
    },
    {
        label: "Class Room",
        required: true,
        param: "moreDetails",
        hidden: false,
        type: "text",
        name: "classroom",
    },
    {
        label: "Race",
        required: true,
        param: "moreDetails",
        hidden: false,
        type: "string",
        name: "race",
        list:[
            {
              label: 'American Indian or Alaska Native',
              value: 'American Indian or Alaska Native',
            },
            { label: 'Asian', value: 'Asian' },
            {
              label: 'Black or African American',
              value: 'Black or African American',
            },
            {
              label: 'Native Hawaiian or Other Pacific Islander',
              value: 'Native Hawaiian or Other Pacific Islander',
            },
            {
              label: 'White',
              value: 'White',
            },
            {
              label: 'Other',
              value: 'Other',
            },
            {
              label: 'Prefer not to state',
              value: 'Prefer not to state',
            },
          ]
    },
    {
        label: "Ethnicity",
        required: true,
        param: "moreDetails",
        hidden: false,
        type: "string",
        name: "ethnicity",
        list:[
            { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
            {
              label: 'Not Hispanic or Latino',
              value: 'Not Hispanic or Latino',
            },
            {
              label: 'Prefer not to state',
              value: 'Prefer not to state',
            },
          ]
    }
]
    export const address = [{
        label: "Address",
        required: true,
        param: "address",
        hidden: false,
        type: "text",
        name: "address",
    },
    {
        label: "City",
        required: true,
        param: "address",
        hidden: false,
        type: "text",
        name: "city",
    },
    {
        label: "State",
        required: true,
        param: "address",
        hidden: false,
        type: "text",
        name: "state",
    },
    {
        label: "Country",
        required: true,
        param: "address",
        hidden: false,
        type: "text",
        name: "country",
    },
    {
        label: "ZipCode",
        required: true,
        param: "address",
        hidden: false,
        type: "number",
        name: "zipCode",
    }];
    export const Insurance= [
        {
            label: "Insurance Carrier Name",
            required: true,
            param: "insurance",
            hidden: false,
            type: "select",
            name: "payerList",
            list:payerName
        },
        {
            label: "Subscriber First Name",
            required: true,
            param: "insurance",
            hidden: false,
            type: "text",
            name: "subscriberFirstName",
        },
        {
            label: "Subscriber Last Name",
            required: true,
            param: "insurance",
            hidden: false,
            type: "text",
            name: "subscriberLastName",
        },
        {
            label: "Insurance ID",
            required: true,
            param: "insurance",
            hidden: false,
            type: "text",
            name: "insuranceId",
        },
        {
            label: "Insurance Group Number",
            required: false,
            param: "insurance",
            hidden: false,
            type: "text",
            name: "group",
        }
    ];
    export const policyHolder = [
        {
            label: "Policy Holder First Name",
            required: true,
            param: "insuranceholder",
            hidden: false,
            type: "text",
            name: "policyHolderFirstName",
        },
        {
            label: "Policy Holder Last Name",
            required: true,
            param: "insuranceholder",
            hidden: false,
            type: "text",
            name: "policyHolderLastName",
        },
        {
            label: "Date of Birth",
            required: true,
            param: "insurance",
            hidden: false,
            type: "date",
            name: "policyHolderbirthDate",
        }
    
    ]