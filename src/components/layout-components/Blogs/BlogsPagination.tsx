"use client"
import Pagination from '@/components/UI/Pagination/Pagination'
import React, { useState } from 'react'

function BlogsPagination() {
    const [page,setPage] = useState(1)
  return (
    <div><Pagination currentPage={page} onPageChange={setPage} pageSize={4} totalCount={12}  /></div>
  )
}

export default BlogsPagination