const donations = [
    {
    //   _id: new ObjectId('66ecece43aa71eff93ecaf40'),
    //   userId: new ObjectId('66e55fe8675c073875488dbd'),
      name: 'tanvir ahamed',
      email: 'tanvir75@gmail.com',
      amount: '2000',
      tran_id: 'csbd8m1a60v4o',
      paymentStatus: 'successful',
    //   paymentDate: 2024-09-20T03:33:04.039Z
    },
    {
    //   _id: new ObjectId('66eced2e3aa71eff93ecaf41'),
    //   userId: new ObjectId('66e55fe8675c073875488dbd'),
      name: 'tanvir ahamed',
      email: 'tanvir75@gmail.com',
      amount: '3000',
      tran_id: 'csbd8m1a62goc',
      paymentStatus: 'successful',
    //   paymentDate: 2024-09-20T03:34:16.918Z
    }
  ]

const lastDonation = donations[donations.length - 1]
console.log(lastDonation);

const amount = parseFloat(donations.amount) // Convert to number
console.log(amount);


const minDonation = donations.reduce((prev, CurreV) => {
    return  Math.min(prev, CurreV.amount)
    
}, donations[0].amount) 

console.log(minDonation);
