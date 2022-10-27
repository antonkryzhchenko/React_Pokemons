import styles from './styles/search.module.css';

const Search = (props) => {
    const {onChange} = props;
    return (
        <>
        <input
        className={styles.searchInput}
        type='text'
        placeholder="Enter name"
        name="search"
        onChange={onChange}
        />
        </>
    )
}
export default Search;