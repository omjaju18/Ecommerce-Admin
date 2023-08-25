"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"
import { Store } from "@prisma/client"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    // Custom hooks for store modal, route parameters, and router
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();
    // Format the store items for rendering
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    // Find the currently selected store
    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    // State for controlling popover open/close
    const [open, setOpen] = React.useState(false)

    // Function to handle store selection and route update
    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false); // Close the popover
        router.push(`/${store.value}`); // Navigate to the selected store
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" /> {/* Store icon */}
                    {currentStore?.label} {/* Display the currently selected store */}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" /> {/* Dropdown icon */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." /> {/* Input for store search */}
                        <CommandEmpty>No store found.</CommandEmpty> {/* Message for no search results */}
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)} // Handle store selection
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" /> {/* Store icon */}
                                    {store.label} {/* Store label */}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    /> {/* Checkmark for selected store */}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator /> {/* Separator between stores and other actions */}
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false); // Close the popover
                                    storeModal.onOpen(); // Open the store creation modal
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" /> {/* Plus icon for creating a store */}
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

