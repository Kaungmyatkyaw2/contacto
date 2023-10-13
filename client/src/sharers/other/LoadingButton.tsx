import { Button, ButtonProps } from '@/components/ui/button'

interface Props extends ButtonProps {
    loading?: boolean,
}

export const LoadingButton = ({ children, loading, className, ...rest }: Props) => {
    return (
        <Button
            {...rest}
            className={`relative ${className}`}
        >
            <span className={`${loading ? 'opacity-0' : "opacity-1"} flex items-center space-x-[10px]`}>{children}</span>
            {
                loading &&
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div
                        className="m-12 inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>
            }
        </Button >
    )
}
