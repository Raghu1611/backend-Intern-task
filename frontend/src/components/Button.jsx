export const Button = ({ children, loading, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseClass = "btn";
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : children}
        </button>
    );
};
