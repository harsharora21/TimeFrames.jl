var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = TSx","category":"page"},{"location":"#TSx","page":"Home","title":"TSx","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for TSx.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [TSx]","category":"page"},{"location":"#TSx.TS","page":"Home","title":"TSx.TS","text":"struct TS\n  coredata :: DataFrame\nend\n\n::TS - A type to hold ordered data with an index.\n\nA TS object is essentially a DataFrame with a specific column marked as an index and has the name Index. The DataFrame is sorted using index values during construction.\n\nPermitted data inputs to constructor are DataFrame, Vector, and 2-dimensional Array. If an index is already not present in the constructor then it is generated.\n\nConstructors\n\nTS(coredata::DataFrame, index::Union{String, Symbol, Int}=1)\nTS(coredata::DataFrame, index::AbstractVector{T}) where {T<:Int}\nTS(coredata::DataFrame, index::UnitRange{Int})\nTS(coredata::AbstractVector{T}, index::AbstractVector{V}) where {T, V}\nTS(coredata::AbstractVector{T}) where {T}\nTS(coredata::AbstractArray{T,2}) where {T}\n\nExamples\n\njulia> df = DataFrame(x1 = randn(10))\njulia> TS(df)                   # generates index\n\njulia> df = DataFrame(ind = [1, 2, 3], x1 = randn(3))\njulia> TS(df, 1)                # first column is index\n\njulia> df = DataFrame(x1 = randn(3), x2 = randn(3), Index = [1, 2, 3])\njulia> TS(df)                   # looks up `Index` column\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,10))\njulia> df = DataFrame(dates = dates, x1 = randn(10))\njulia> TS(df, :dates)\njulia> TS(DataFrame(x1=randn(10), dates))\n\njulia> TS(randn(10))\njulia> TS(randn(10), dates)\n\n\n\n\n\n","category":"type"},{"location":"#Base.getindex-Tuple{TS, Int64}","page":"Home","title":"Base.getindex","text":"Subsetting/Indexing\n\nTS can be subset using row and column indices. The row selector could be an integer, a range, an array or it could also be a Date object or an ISO-formatted date string (\"2007-04-10\"). There are methods to subset on year, year-month, and year-quarter.\n\nThe latter two subset coredata by matching on the index column.\n\nColumn selector could be an integer or any other selector which DataFrame indexing supports. To fetch the index column one can use the index() method on the TS object.\n\nExamples\n\njulia> ts = TS([randn(10) randn(10) randn(10)])\njulia> ts[1]\njulia> ts[1:5]\njulia> ts[1:5, 2]\njulia> ts[1:5, 2:3]\njulia> ts[[1, 9]]               # individual rows\n\njulia> dates = collect(Date(2007):Day(1):Date(2008, 2, 22))\njulia> ts = TS(randn(length(dates)), dates)\njulia> ts[Date(2007, 01, 01)]\njulia> ts[Date(2007)]\njulia> ts[Year(2007)]\njulia> ts[Year(2007), Month(11)]\njulia> ts[Year(2007), Quarter(2)]\njulia> ts[\"2007-01-01\"]\n\njulia> ts[1, :x1]\njulia> ts[1, \"x1\"]\n\n\n\n\n\n","category":"method"},{"location":"#Base.join-Tuple{TS, TS}","page":"Home","title":"Base.join","text":"Joins/Column-binding\n\nTS objects can be combined together column-wise using Index as the column key. There are four kinds of column-binding operations possible as of now. Each join operation works by performing a Set operation on the Index column and then merging the datasets based on the output from the Set operation. Each operation changes column names in the final object automatically if the operation encounters duplicate column names amongst the TS objects.\n\nThe following join types are supported:\n\njoin(ts1::TS, ts2::TS, ::JoinBoth)\n\na.k.a. inner join, takes the intersection of the indexes of ts1 and ts2, and then merges the columns of both the objects. The resulting object will only contain rows which are present in both the objects' indexes. The function will renamine the columns in the final object if they had same names in the TS objects.\n\njoin(ts1::TS, ts2::TS, ::JoinAll):\n\na.k.a. outer join, takes the union of the indexes of ts1 and ts2 before merging the other columns of input objects. The output will contain rows which are present in all the input objects while inserting missing values where a row was not present in any of the objects. This is the default behaviour if no JoinType object is provided.\n\njoin(ts1::TS, ts2::TS, ::JoinLeft):\n\nLeft join takes the index values which are present in the left object ts1 and finds matching index values in the right object ts2. The resulting object includes all the rows from the left object, the column values from the left object, and the values associated with matching index rows on the right. The operation inserts missing values where in the unmatched rows of the right object.\n\njoin(ts1::TS, ts2::TS, ::JoinRight)\n\nRight join, similar to left join but works in the opposite direction. The final object contains all the rows from the right object while inserting missing values in rows missing from the left object.\n\nThe default behaviour is to assume JoinAll() if no JoinType object is provided to the join method.\n\ncbind is an alias for join method.\n\nExamples\n\njulia> ts1 = TS(randn(10), 1:10)\njulia> ts2 = TS(randn(10), 1:10)\n\njulia> join(ts1, ts2, JoinAll()) # with `missing` inserted\njulia> join(ts1, ts2)            # same as JoinAll()\njulia> join(ts1, ts2, JoinBoth())\njulia> join(ts1, ts2, JoinLeft())\njulia> join(ts1, ts2, JoinRight())\n\n# Using TimeType objects\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,10))\njulia> ts1 = TS(randn(length(dates)), dates)\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,30))\njulia> ts2 = TS(randn(length(dates)), dates)\n\njulia> join(ts1, ts2)\n\n\n\n\n\n","category":"method"},{"location":"#Base.size-Tuple{TS}","page":"Home","title":"Base.size","text":"Size methods\n\nsize(ts::TS) Return the number of rows and columns of ts as a tuple.\n\nExamples\n\njulia> ts = TS([randn(100) randn(100) randn(100)])\njulia> size(ts)\n\n\n\n\n\n","category":"method"},{"location":"#TSx.apply-Union{Tuple{V}, Tuple{T}, Tuple{TS, Union{Type{T}, T}, V}, Tuple{TS, Union{Type{T}, T}, V, Function}} where {T<:Union{Dates.DatePeriod, Dates.TimePeriod}, V<:Function}","page":"Home","title":"TSx.apply","text":"Apply/Period conversion\n\napply(ts::TS, period::Union{T,Type{T}},       fun::V,       index_at::Function=first)      where {T<:Union{DatePeriod,TimePeriod}, V<:Function}\n\nApply fun to ts object based on period and return correctly indexed rows. This method is used for doing aggregation over a time period or to convert ts into an object of lower frequency (ex. from daily series to monthly).\n\nperiod is any of Period types in the Dates module. Conversion from lower to a higher frequency will throw an error as interpolation isn't currently handled by this method.\n\nBy default, the method uses the first value of the index within the period to index the resulting aggregated object. This behaviour can be controlled by index_at argument which can take first or last as an input.\n\nExamples\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2018,3,10))\njulia> ts = TS(DataFrame(Index = dates, x1 = randn(length(dates))))\n\n# take the first observation in each month\njulia> ts_monthly = apply(tsd, Month, first)\n# alternate months\njulia> ts_two_monthly = apply(tsd, Month(2), first)\n\n# weekly standard deviation\njulia> ts_monthly = apply(tsd, Week, Statistics.std)\n# indexed by last date of the week\njulia> ts_monthly = apply(tsd, Week, Statistics.std, last)\n\n\n\n\n\n","category":"method"},{"location":"#TSx.index-Tuple{TS}","page":"Home","title":"TSx.index","text":"Index column\n\nReturn the index vector from the TS DataFrame.\n\nExamples\n\njulia> ts = TS(randn(10), today():Month(1):today()+Month(9))\njulia> index(ts)\njulia> typeof(index(ts))\n\n\n\n\n\n","category":"method"},{"location":"#TSx.ncol-Tuple{TS}","page":"Home","title":"TSx.ncol","text":"Size methods\n\nncol(ts::TS) Return the number of columns of ts.\n\nExamples\n\njulia> ts = TS([randn(100) randn(100) randn(100)])\njulia> ncol(ts)\n\n\n\n\n\n","category":"method"},{"location":"#TSx.nrow-Tuple{TS}","page":"Home","title":"TSx.nrow","text":"Size methods\n\nnrow(ts::TS) Return the number of rows of ts.\n\nExamples\n\njulia> ts = TS(randn(100))\njulia> nrow(ts)\n\n\n\n\n\n","category":"method"}]
}
