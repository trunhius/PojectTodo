import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

const Index = () => {
  const [activeTab, setActiveTab] = useState('all')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <main className="mx-auto w-[480px] pt-12 font-sans">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root
          defaultValue={activeTab}
          orientation="vertical"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <Tabs.List
            aria-label="tabs example"
            className="justify-left flex pt-6"
          >
            <Tabs.Trigger
              value="all"
              className={` mr-2 cursor-pointer rounded-full border border-gray-300 px-6 py-3 transition delay-100 duration-300 hover:border-gray-700 focus:bg-gray-700 focus:text-white ${
                activeTab === 'all' ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <p className="size-3.5 font-bold leading-5">All</p>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pending"
              className={`mr-2 cursor-pointer rounded-full border border-gray-300 px-6 py-3 transition delay-100 duration-300 hover:border-gray-700
              focus:bg-gray-700 focus:text-white ${
                activeTab === 'pending' ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <p className="size-3.5 font-bold leading-5">Pending</p>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="completed"
              className={` mr-2 cursor-pointer rounded-full border border-gray-300 px-6 py-3 transition duration-300 hover:border-gray-700
              focus:bg-gray-700 focus:text-white ${
                activeTab === 'completed' ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <p className="size-3.5 font-bold leading-5">Complete</p>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="all">
            <div>
              <TodoList filter="all" />
            </div>
          </Tabs.Content>
          <Tabs.Content value="pending">
            <div>
              <TodoList filter="pending" />
            </div>
          </Tabs.Content>
          <Tabs.Content value="completed">
            <div>
              <TodoList filter="completed" />
            </div>
          </Tabs.Content>
        </Tabs.Root>
        {/* Biểu mẫu tạo mới Todo */}
        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
