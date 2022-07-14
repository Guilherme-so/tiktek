import React from 'react'
import type { NextPage } from "next"

type NoResultsProps = {
    text: string
}

const NoResults: NextPage<NoResultsProps> = ({ text }) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

export default NoResults
