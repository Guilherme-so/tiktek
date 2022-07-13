import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

type ListProps = {
  items: string[],
  mt: boolean
}

const List = ({ items, mt }: ListProps) => (
  <div className={`flex gap-2 flex-wrap ${mt && 'mt-5'}`}>
    {items.map((item) => (
      <p className='text-gray-500 text-sm hover:underline cursor-pointer'>
        {item}
      </p>
    ))}
  </div>
)

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className='mt-5 text-gray-500 text-sm'>
        2022 Tiktek
      </p>
    </div>
  )
}

export default Footer